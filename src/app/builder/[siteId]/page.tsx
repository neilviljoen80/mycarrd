import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BuilderEditor } from "@/components/builder/BuilderEditor";

export default async function BuilderPage({ params }: { params: Promise<{ siteId: string }> }) {
    const { siteId } = await params;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Get user data for Pro status
    const { data: userData } = await supabase
        .from("users")
        .select("is_pro")
        .eq("id", user.id)
        .maybeSingle();

    const isPro = userData ? (userData as any).is_pro : false;

    // Get site
    const { data: site, error } = await supabase
        .from("sites")
        .select("*")
        .eq("id", siteId)
        .eq("user_id", user.id)
        .maybeSingle();

    if (error || !site) {
        redirect("/dashboard");
    }

    return <BuilderEditor site={site as any} isPro={isPro} />;
}
