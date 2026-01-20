"use server";

import { createClient } from "@/lib/supabase/server";
import { fetchXEmbed } from "@/lib/oembed";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Site } from "@/types/database";

export async function updateSite(
    siteId: string,
    data: Partial<Omit<Site, "id" | "user_id" | "created_at">>
) {
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

    let query = (supabase.from("sites") as any).update(data).eq("id", siteId);

    if (user) {
        query = query.eq("user_id", user.id);
    } else {
        query = query.is("user_id", null);
    }

    const { error } = await query;

    if (error) {
        throw new Error("Failed to update site");
    }

    revalidatePath(`/builder/${siteId}`);
}

export async function getXEmbed(url: string) {
    const result = await fetchXEmbed(url);

    if (result.error) {
        throw new Error(result.error);
    }

    return result.html;
}
