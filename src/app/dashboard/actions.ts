"use server";

import { createClient } from "@/lib/supabase/server";
import { generateSubdomain } from "@/lib/subdomain";
import { getTemplateById } from "@/lib/templates";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSite(templateId: string = "blank", draft?: any) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    const template = draft || getTemplateById(templateId);

    // Get user data
    const { data: userData } = await (supabase
        .from("users") as any)
        .select("username, is_pro")
        .eq("id", user.id)
        .maybeSingle();

    const username = userData?.username || "user";

    // Check site limit for free tier
    if (userData && !userData.is_pro) {
        const { count } = await (supabase
            .from("sites") as any)
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);

        if (count !== null && count >= 3) {
            throw new Error("Free tier limited to 3 sites. Upgrade to Pro for unlimited sites.");
        }
    }

    // Generate unique subdomain based on username
    let subdomain = generateSubdomain(username);
    let attempts = 0;

    while (attempts < 5) {
        const { data: existing } = await (supabase
            .from("sites") as any)
            .select("id")
            .eq("subdomain", subdomain)
            .maybeSingle();

        if (!existing) break;

        subdomain = generateSubdomain(username);
        attempts++;
    }

    // Create site with template data
    const payload = {
        user_id: user.id,
        subdomain,
        title: template.title,
        description: template.description,
        links: template.links,
        embeds: template.embeds,
        background_color: template.background_color,
        styles: template.styles,
        is_published: true,
    };

    console.log("Creating site with payload:", JSON.stringify(payload, null, 2));

    const { data: site, error } = await (supabase
        .from("sites") as any)
        .insert(payload)
        .select()
        .single();

    if (error) {
        console.error("Create site error details:", error);
        throw error;
    }

    revalidatePath("/dashboard");

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
