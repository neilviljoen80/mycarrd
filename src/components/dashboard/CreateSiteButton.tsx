"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createSite } from "@/app/dashboard/actions";

export function CreateSiteButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreate = async () => {
        setLoading(true);
        try {
            const siteId = await createSite();
            router.push(`/builder/${siteId}`);
        } catch (error: any) {
            alert(error.message);
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleCreate} disabled={loading}>
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Creating..." : "Create New Site"}
        </Button>
    );
}
