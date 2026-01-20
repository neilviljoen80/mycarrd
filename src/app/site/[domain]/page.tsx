import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { SiteRenderer } from "@/components/site/SiteRenderer";

export default async function SitePage({ params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    const supabase = await createClient();

    // Try to find site by subdomain first, then custom domain
    let siteResult = await supabase
        .from("sites")
        .select("*")
        .eq("subdomain", domain)
        .eq("is_published", true)
        .maybeSingle();

    let site = siteResult.data;

    // If not found by subdomain, try custom domain
    if (!site) {
        const result = await supabase
            .from("sites")
            .select("*")
            .eq("custom_domain", domain)
            .eq("is_published", true)
            .maybeSingle();
        site = result.data;
    }

    if (!site) {
        notFound();
    }

    // Get user data to check Pro status (if user exists)
    let isPro = false;
    if ((site as any).user_id) {
        const { data: userData } = await (supabase
            .from("users") as any)
            .select("is_pro")
            .eq("id", (site as any).user_id)
            .maybeSingle();

        isPro = userData ? (userData as any).is_pro : false;
    }

    return <SiteRenderer site={site as any} isPro={isPro} />;
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    const supabase = await createClient();

    let siteResult = await supabase
        .from("sites")
        .select("title, description")
        .eq("subdomain", domain)
        .eq("is_published", true)
        .maybeSingle();

    let site = siteResult.data;

    if (!site) {
        const result = await supabase
            .from("sites")
            .select("title, description")
            .eq("custom_domain", domain)
            .eq("is_published", true)
            .maybeSingle();
        site = result.data;
    }

    const typedSite = site as any;

    return {
        title: typedSite?.title || "mycarrd.online",
        description: typedSite?.description || "Link in bio",
    };
}
