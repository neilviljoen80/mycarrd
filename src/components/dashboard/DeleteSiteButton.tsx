"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteSite } from "@/app/dashboard/actions";

export function DeleteSiteButton({ siteId }: { siteId: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this site?")) {
            return;
        }

        setLoading(true);
        try {
            await deleteSite(siteId);
        } catch (error: any) {
            alert(error.message);
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDelete}
            disabled={loading}
            variant="destructive"
            size="sm"
            className="w-full"
        >
            <Trash2 className="h-4 w-4 mr-2" />
            {loading ? "Deleting..." : "Delete"}
        </Button>
    );
}
