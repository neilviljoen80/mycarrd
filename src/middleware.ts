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

    const host = request.headers.get("host") || "";

    // Check for subdomain or custom domain
    const subdomain = parseSubdomain(host);
    const customDomain = isCustomDomain(host);

    // If subdomain or custom domain detected, rewrite to site rendering page
    if (subdomain || customDomain) {
        const domain = subdomain || host.split(":")[0];
        const url = request.nextUrl.clone();
        url.pathname = `/site/${domain}`;
        return NextResponse.rewrite(url);
    }

    // Protect dashboard and builder routes
    const protectedPaths = ["/dashboard", "/builder"];
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
            url.searchParams.set("redirectTo", request.nextUrl.pathname);
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
