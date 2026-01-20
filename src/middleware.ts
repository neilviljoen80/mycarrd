import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { parseSubdomain, isCustomDomain } from "@/lib/subdomain";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
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
        }
    );

    // Use more defensive host retrieval for Edge compatibility
    const host = request.headers.get("host") || "";
    const pathname = request.nextUrl.pathname;

    // Safely parse subdomain
    let subdomain: string | null = null;
    let customDomain = false;

    try {
        subdomain = parseSubdomain(host);
        customDomain = isCustomDomain(host);
    } catch (e) {
        console.error("Failed to parse domain:", e);
    }

    // If root path (no subdomain) OR it's a known non-site path, serve the landing page
    if (!subdomain && !customDomain) {
        // Proceed to next middleware/page
    } else {
        // If subdomain detected, rewrite to site rendering page unless it's an internal route
        const internalPaths = ["/_next", "/api", "/auth", "/dashboard", "/builder", "/site", "/favicon.ico"];
        const isInternalPath = internalPaths.some(path => pathname.startsWith(path));

        if (!isInternalPath) {
            const domain = subdomain || host.split(":")[0];
            const url = request.nextUrl.clone();
            url.pathname = `/site/${domain}`;
            return NextResponse.rewrite(url);
        }
    }

    // Protect dashboard routes
    const protectedPaths = ["/dashboard"];
    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath) {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            const url = request.nextUrl.clone();
            url.pathname = "/auth/login";
            url.searchParams.set("redirectTo", pathname);
            return NextResponse.redirect(url);
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
