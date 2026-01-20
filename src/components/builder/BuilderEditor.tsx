"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Site } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { LinkEditor } from "./LinkEditor";
import { EmbedEditor } from "./EmbedEditor";
import { ImageUpload } from "./ImageUpload";
import { updateSite } from "@/app/builder/[siteId]/actions";

interface BuilderEditorProps {
    site: Site;
    isPro: boolean;
}

export function BuilderEditor({ site, isPro }: BuilderEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(site.title);
    const [description, setDescription] = useState(site.description);
    const [backgroundColor, setBackgroundColor] = useState(site.background_color);
    const [profileImageUrl, setProfileImageUrl] = useState(site.profile_image_url || "");
    const [links, setLinks] = useState(site.links);
    const [embeds, setEmbeds] = useState(site.embeds);
    const [customDomain, setCustomDomain] = useState(site.custom_domain || "");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSite(site.id, {
                title,
                description,
                background_color: backgroundColor,
                profile_image_url: profileImageUrl || null,
                links,
                embeds,
                custom_domain: isPro ? (customDomain || null) : null,
            });
            alert("Site saved successfully!");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">Edit Site</h1>
                            <p className="text-sm text-muted-foreground">
                                {site.subdomain}.mycarrd.online
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                            <a
                                href={`https://${site.subdomain}.mycarrd.online`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Preview
                            </a>
                        </Button>
                        <Button onClick={handleSave} disabled={saving}>
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Editor */}
            <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Site Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="My Awesome Site"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="A brief description of your site"
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ImageUpload
                            currentUrl={profileImageUrl}
                            onUpload={(url) => setProfileImageUrl(url)}
                        />
                    </CardContent>
                </Card>

                {/* Background Color */}
                <Card>
                    <CardHeader>
                        <CardTitle>Background Color</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex gap-4 items-center">
                            <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="h-10 w-20 rounded cursor-pointer"
                            />
                            <Input
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                placeholder="#ffffff"
                                className="flex-1"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LinkEditor links={links} onChange={setLinks} />
                    </CardContent>
                </Card>

                {/* X/Twitter Embeds */}
                <Card>
                    <CardHeader>
                        <CardTitle>X/Twitter Thread Embeds</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <EmbedEditor embeds={embeds} onChange={setEmbeds} />
                    </CardContent>
                </Card>

                {/* Custom Domain (Pro Only) */}
                {isPro && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Domain (Pro)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label htmlFor="custom-domain">Custom Domain</Label>
                            <Input
                                id="custom-domain"
                                value={customDomain}
                                onChange={(e) => setCustomDomain(e.target.value)}
                                placeholder="yourdomain.com"
                            />
                            <p className="text-sm text-muted-foreground">
                                Point your domain's DNS to your Vercel deployment
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
