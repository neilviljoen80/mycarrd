import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Check if user exists in our users table
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                // Check if user record exists
                const { data: existingUser } = await supabase
                    .from("users")
                    .select()
                    .eq("id", user.id)
                    .single();

                // Create user record if it doesn't exist
                if (!existingUser) {
                    const username = user.email?.split("@")[0] || "user";
                    await (supabase.from("users") as any).insert({
                        id: user.id,
                        email: user.email!,
                        username,
                        is_pro: false,
                    });
                }
            }

            const forwardedHost = request.headers.get("x-forwarded-host");
            const isLocalEnv = process.env.NODE_ENV === "development";

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
