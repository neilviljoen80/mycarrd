"use client";

import { useState } from "react";
import type { Embed } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { getXEmbed } from "@/app/builder/[siteId]/actions";

interface EmbedEditorProps {
    embeds: Embed[];
    onChange: (embeds: Embed[]) => void;
}

export function EmbedEditor({ embeds, onChange }: EmbedEditorProps) {
    const [newUrl, setNewUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        if (!newUrl) return;

        setLoading(true);
        try {
            const html = await getXEmbed(newUrl);
            if (html) {
                onChange([...embeds, { type: "x_thread", url: newUrl, html }]);
                setNewUrl("");
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = (index: number) => {
        onChange(embeds.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {/* Existing Embeds */}
            {embeds.map((embed, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-sm font-medium">X/Twitter Thread</p>
                            <p className="text-xs text-muted-foreground truncate">{embed.url}</p>
                        </div>
                        <Button
                            onClick={() => handleRemove(index)}
                            variant="destructive"
                            size="sm"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    {/* Preview */}
                    <div
                        className="border rounded p-2 bg-gray-50 max-h-96 overflow-auto"
                        dangerouslySetInnerHTML={{ __html: embed.html }}
                    />
                </div>
            ))}

            {/* Add New Embed */}
            <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <Label>Add X/Twitter Thread</Label>
                <div className="flex gap-2">
                    <Input
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="https://twitter.com/username/status/..."
                    />
                    <Button onClick={handleFetch} disabled={loading || !newUrl}>
                        {loading ? "Fetching..." : "Add"}
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Paste a link to any X/Twitter thread to embed it on your page
                </p>
            </div>
        </div>
    );
}
