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
    } catch (error) {
        console.error("Failed to create site from template:", error);
        redirect("/dashboard?error=failed_to_create_site");
    }

    if (siteId) {
        redirect(`/builder/${siteId}`);
    }

    redirect("/dashboard");
}
