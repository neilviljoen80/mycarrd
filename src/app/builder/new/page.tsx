import { createSite } from "@/app/dashboard/actions";
import { redirect } from "next/navigation";

export default async function NewBuilderPage({
    searchParams,
}: {
    searchParams: Promise<{ template?: string }>;
}) {
    const { template } = await searchParams;
    const templateId = template || "blank";

    let siteId: string;
    try {
        siteId = await createSite(templateId);
    } catch (error: any) {
        console.error("Failed to create site from template:", error);
        const message = error.message || "failed_to_create_site";
        redirect(`/templates?error=${encodeURIComponent(message)}`);
    }

    if (siteId) {
        redirect(`/builder/${siteId}`);
    }

    redirect("/dashboard");
}
