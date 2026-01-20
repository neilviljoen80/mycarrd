"use server";

import { createClient } from "@/lib/supabase/server";
import { generateSubdomain } from "@/lib/subdomain";
import { getTemplateById } from "@/lib/templates";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSite(templateId: string = "blank") {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Remove mandatory redirect to login
    /*
    if (!user) {
        redirect("/auth/login");
    }
    */

    const template = getTemplateById(templateId);

    let username = "guest";
    let userId = null;

    if (user) {
        userId = user.id;
        // Get user data
        const { data: userData } = await (supabase
            .from("users") as any)
            .select("username, is_pro")
            .eq("id", user.id)
            .maybeSingle();

        if (userData) {
            username = userData.username;

            // Check site limit for free tier
            if (!userData.is_pro) {
                const { count } = await (supabase
                    .from("sites") as any)
                    .select("*", { count: "exact", head: true })
                    .eq("user_id", user.id);

                if (count !== null && count >= 3) {
                    throw new Error("Free tier limited to 3 sites. Upgrade to Pro for unlimited sites.");
                }
            }
        }
    }

    // Generate unique subdomain based on username or template title
    let subdomain = generateSubdomain(username === "guest" ? template.title.split(" ")[0] : username);
    let attempts = 0;

    while (attempts < 5) {
        const { data: existing } = await (supabase
            .from("sites") as any)
            .select("id")
            .eq("subdomain", subdomain)
            .maybeSingle();

        if (!existing) break;

        subdomain = generateSubdomain(username === "guest" ? template.title.split(" ")[0] : username);
        attempts++;
    }

    // Create site with template data
    const { data: site, error } = await (supabase
        .from("sites") as any)
        .insert({
            user_id: userId,
            subdomain,
            title: template.title,
            description: template.description,
            links: template.links,
            embeds: template.embeds,
            background_color: template.background_color,
            is_published: true,
        })
        .select()
        .single();

    if (error) {
        console.error("Create site error details:", error);
        throw new Error(`Failed to create site: ${error.message}`);
    }

    if (user) {
        revalidatePath("/dashboard");
    }

    return site.id;
}

export async function deleteSite(siteId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Allow deletion if user owns it OR if it's a guest site (RLS will check)
    let query = (supabase.from("sites") as any).delete().eq("id", siteId);

    if (user) {
        query = query.eq("user_id", user.id);
    } else {
        query = query.is("user_id", null);
    }

    const { error } = await query;

    if (error) {
        throw new Error("Failed to delete site");
    }

    revalidatePath("/dashboard");
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}
