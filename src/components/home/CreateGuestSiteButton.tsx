"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createSite } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function CreateGuestSiteButton({ children, size = "default", variant = "default", className, templateId = "blank" }: {
    children: React.ReactNode,
    size?: "default" | "sm" | "lg" | "icon" | null | undefined,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
    className?: string,
    templateId?: string
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleCreate = () => {
        startTransition(async () => {
            try {
                const siteId = await createSite(templateId);
                router.push(`/builder/${siteId}`);
            } catch (error) {
                console.error("Failed to create guest site:", error);
            }
        });
    };

    return (
        <Button
            onClick={handleCreate}
            disabled={isPending}
            size={size || "default"}
            variant={variant || "default"}
            className={className}
        >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
}
