"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getTemplateById, Template } from "@/lib/templates";
import { BuilderEditor } from "@/components/builder/BuilderEditor";
import { createClient } from "@/lib/supabase/client";
import { createSite } from "@/app/dashboard/actions";
import type { Site } from "@/types/database";

function NewBuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const templateId = searchParams.get("template") || "blank";
    const [template, setTemplate] = useState<Template | null>(null);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const handleMigration = async () => {
            const { data } = await supabase.auth.getUser();
            const currentUser = data.user;
            setUser(currentUser);

            if (currentUser) {
                // Check for draft to migrate
                const savedDraft = localStorage.getItem("guest_site_draft");
                if (savedDraft) {
                    try {
                        const draftData = JSON.parse(savedDraft);
                        const siteId = await createSite(templateId, draftData);
                        localStorage.removeItem("guest_site_draft");
                        router.push(`/builder/${siteId}`);
                        return;
                    } catch (error) {
                        console.error("Failed to migrate draft:", error);
                    }
                }
            }

            setTemplate(getTemplateById(templateId));
        };
        handleMigration();
    }, [templateId, supabase, router]);

    if (!template) return <div className="min-h-screen bg-[#1a1c23] flex items-center justify-center text-white">Loading...</div>;

    // Convert template to a partial Site object for the editor
    const guestSite: any = {
        id: "guest",
        title: template.title,
        description: template.description,
        background_color: template.background_color,
        links: template.links,
        embeds: template.embeds,
        profile_image_url: null,
        subdomain: "guest-draft",
        is_published: false,
    };

    return (
        <BuilderEditor
            site={guestSite}
            isPro={false}
            isGuest={!user}
        />
    );
}

export default function NewBuilderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#1a1c23] flex items-center justify-center text-white">Loading...</div>}>
            <NewBuilderContent />
        </Suspense>
    );
}
