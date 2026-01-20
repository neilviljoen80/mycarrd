"use client";

import { useState } from "react";
import type { Link } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface LinkEditorProps {
    links: Link[];
    onChange: (links: Link[]) => void;
}

const iconOptions = [
    "link",
    "twitter",
    "instagram",
    "youtube",
    "github",
    "linkedin",
    "facebook",
    "tiktok",
    "email",
    "globe",
];

export function LinkEditor({ links, onChange }: LinkEditorProps) {
    const handleAdd = () => {
        onChange([...links, { title: "", url: "", icon: "link" }]);
    };

    const handleRemove = (index: number) => {
        onChange(links.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: keyof Link, value: string) => {
        const newLinks = [...links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        onChange(newLinks);
    };

    return (
        <div className="space-y-4">
            {links.map((link, index) => (
                <div key={index} className="flex gap-2 items-start p-4 border rounded-lg bg-white">
                    <div className="flex-1 space-y-3">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={link.title}
                                onChange={(e) => handleChange(index, "title", e.target.value)}
                                placeholder="My Link"
                            />
                        </div>
                        <div>
                            <Label>URL</Label>
                            <Input
                                value={link.url}
                                onChange={(e) => handleChange(index, "url", e.target.value)}
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <Label>Icon</Label>
                            <select
                                value={link.icon}
                                onChange={(e) => handleChange(index, "icon", e.target.value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {iconOptions.map((icon) => (
                                    <option key={icon} value={icon}>
                                        {icon}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleRemove(index)}
                        variant="destructive"
                        size="sm"
                        className="mt-6"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Link
            </Button>
        </div>
    );
}
