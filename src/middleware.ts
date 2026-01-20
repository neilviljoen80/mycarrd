import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { parseSubdomain, isCustomDomain } from "@/lib/subdomain";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Supabase client creation can fail if env vars are missing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase env vars missing in middleware");
        return response;
    }

    // Create Supabase client for auth checks
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet: any[]) {
                cookiesToSet.forEach(({ name, value }: { name: string, value: string }) =>
                    request.cookies.set(name, value)
                );
                response = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }: { name: string, value: string, options: any }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    // Get host from headers
    const host = request.headers.get("host") || "";
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // Safely parse subdomain
    let subdomain: string | null = null;
    let customDomain = false;

    try {
        subdomain = parseSubdomain(host);
        customDomain = isCustomDomain(host);
    } catch (e) {
        console.error("Failed to parse domain:", e);
    }

    // INTERNAL PATH CHECK
    // If it's an internal route (auth, dashboard, builder, etc.), don't do any subdomain rewrites
    const internalPaths = ["/_next", "/api", "/auth", "/dashboard", "/builder", "/templates", "/favicon.ico", "/site"];
    const isInternalPath = internalPaths.some(path => pathname.startsWith(path));

    if (isInternalPath) {
        // Protect dashboard routes
        if (pathname.startsWith("/dashboard")) {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    const loginUrl = request.nextUrl.clone();
                    loginUrl.pathname = "/auth/login";
                    loginUrl.searchParams.set("redirectTo", pathname);
                    return NextResponse.redirect(loginUrl);
                }
            } catch (error) {
                console.error("Middleware auth check failed:", error);
            }
        }
        return response;
    }

    // SUBDOMAIN REWRITING
    if (subdomain || customDomain) {
        const domain = subdomain || host.split(":")[0];
        url.pathname = `/site/${domain}`;
        return NextResponse.rewrite(url);
    }

    // DEFAULT: Serve main site landing page
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - and file extensions (svg, png, etc.)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
