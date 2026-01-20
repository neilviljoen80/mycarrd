import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BuilderEditor } from "@/components/builder/BuilderEditor";

export default async function BuilderPage({ params }: { params: Promise<{ siteId: string }> }) {
    const { siteId } = await params;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Remove mandatory redirect - guests can use the builder
    /*
    if (!user) {
        redirect("/auth/login");
    }
    */

    let isPro = false;
    if (user) {
        // Get user data for Pro status
        const { data: userData } = await supabase
            .from("users")
            .select("is_pro")
            .eq("id", user.id)
            .maybeSingle();

        isPro = userData ? (userData as any).is_pro : false;
    }

    // Get site
    let query = supabase.from("sites").select("*").eq("id", siteId);

    if (user) {
        // If logged in, prioritize user context but allow guest site access if needed? 
        // For now, if logged in, site must be yours OR anonymous.
        // Simplified: if user exists, check ownership. If not, check anonymous.
        query = query.or(`user_id.eq.${user.id},user_id.is.null`);
    } else {
        query = query.is("user_id", null);
    }

    const { data: site, error } = await query.maybeSingle();

    if (error || !site) {
        redirect(user ? "/dashboard" : "/");
    }

    return <BuilderEditor site={site as any} isPro={isPro} />;
}
