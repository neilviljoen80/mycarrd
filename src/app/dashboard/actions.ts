"use server";

import { createClient } from "@/lib/supabase/server";
import { generateSubdomain } from "@/lib/subdomain";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSite() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Get user data
    const { data: userData } = await (supabase
        .from("users") as any)
        .select("username, is_pro")
        .eq("id", user.id)
        .single();

    if (!userData) {
        throw new Error("User not found");
    }

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

    // Generate unique subdomain
    let subdomain = generateSubdomain(userData.username);
    let attempts = 0;

    while (attempts < 5) {
        const { data: existing } = await (supabase
            .from("sites") as any)
            .select("id")
            .eq("subdomain", subdomain)
            .maybeSingle();

        if (!existing) break;

        subdomain = generateSubdomain(userData.username);
        attempts++;
    }

    // Create site
    const { data: site, error } = await (supabase
        .from("sites") as any)
        .insert({
            user_id: user.id,
            subdomain,
            title: "My Site",
            description: "",
            links: [],
            embeds: [],
            background_color: "#ffffff",
            is_published: true,
        })
        .select()
        .single();

    if (error) {
        throw new Error("Failed to create site");
    }

    revalidatePath("/dashboard");
    return site.id;
}

export async function deleteSite(siteId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const { error } = await (supabase
        .from("sites") as any)
        .delete()
        .eq("id", siteId)
        .eq("user_id", user.id);

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
