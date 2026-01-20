"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Site } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Rocket, Loader2, Eye, Layout } from "lucide-react";
import Link from "next/link";
import { LinkEditor } from "./LinkEditor";
import { EmbedEditor } from "./EmbedEditor";
import { ImageUpload } from "./ImageUpload";
import { updateSite } from "@/app/builder/[siteId]/actions";
import { LoginPrompt } from "./LoginPrompt";
import { createSite } from "@/app/dashboard/actions";
import { useEffect } from "react";
import { SiteRenderer } from "@/components/site/SiteRenderer";

interface BuilderEditorProps {
    site: Site;
    isPro: boolean;
    isGuest?: boolean;
}

export function BuilderEditor({ site, isPro, isGuest = false }: BuilderEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(site.title);
    const [description, setDescription] = useState(site.description);
    const [backgroundColor, setBackgroundColor] = useState(site.background_color);
    const [profileImageUrl, setProfileImageUrl] = useState(site.profile_image_url || "");
    const [links, setLinks] = useState(site.links);
    const [embeds, setEmbeds] = useState(site.embeds);
    const [customDomain, setCustomDomain] = useState(site.custom_domain || "");
    const [saving, setSaving] = useState(false);
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    // Mock site object for local preview
    const previewSite: Site = {
        ...site,
        title,
        description,
        background_color: backgroundColor,
        profile_image_url: profileImageUrl || null,
        links,
        embeds,
        custom_domain: customDomain || null,
    };

    // Draft data for persistence/migration
    const currentDraft = {
        title,
        description,
        background_color: backgroundColor,
        profile_image_url: profileImageUrl || null,
        links,
        embeds,
    };

    // Auto-save guest draft to localStorage
    useEffect(() => {
        if (isGuest) {
            localStorage.setItem("guest_site_draft", JSON.stringify(currentDraft));
        }
    }, [title, description, backgroundColor, profileImageUrl, links, embeds, isGuest]);

    const handleSave = async () => {
        if (isGuest) {
            setIsLoginPromptOpen(true);
            return;
        }

        setSaving(true);
        try {
            await updateSite(site.id, currentDraft);
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
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">Design Your Site</h1>
                            <p className="text-sm text-muted-foreground">
                                {isGuest ? "Guest Draft" : `${site.subdomain}.mycarrd.online`}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPreviewMode(!previewMode)}
                            className="md:hidden"
                        >
                            {previewMode ? <Layout className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                            {previewMode ? "Editor" : "Preview"}
                        </Button>
                        {!isGuest && (
                            <Button asChild variant="outline" size="sm" className="hidden md:flex">
                                <a
                                    href={`https://${site.subdomain}.mycarrd.online`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Live
                                </a>
                            </Button>
                        )}
                        <Button onClick={handleSave} disabled={saving} className={isGuest ? "bg-indigo-600 hover:bg-indigo-700 font-bold" : ""}>
                            {isGuest ? (
                                <Rocket className="h-4 w-4 mr-2" />
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            {saving ? "Saving..." : isGuest ? "Publish" : "Save"}
                        </Button>
                    </div>
                </div>
            </header>

            <LoginPrompt
                isOpen={isLoginPromptOpen}
                onClose={() => setIsLoginPromptOpen(false)}
                draftData={currentDraft}
            />

            {/* Editor Body */}
            <div className="flex flex-col md:flex-row h-[calc(100vh-73px)] overflow-hidden">
                {/* Editor Panel */}
                <div className={`flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-white border-r ${previewMode ? "hidden md:block" : "block"}`}>
                    <div className="max-w-2xl mx-auto space-y-6 pb-20">
                        {/* Basic Info */}
                        <Card className="border-white/10 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Site Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="My Awesome Site"
                                        className="rounded-xl"
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
                                        className="rounded-xl resize-none"
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

                {/* Preview Panel */}
                <div className={`flex-1 bg-gray-100 overflow-y-auto ${previewMode ? "block" : "hidden md:flex"} items-start justify-center p-4 md:p-12`}>
                    <div className="w-full max-w-lg bg-white shadow-2xl rounded-[3rem] overflow-hidden border-[8px] border-gray-900 aspect-[9/16] md:aspect-auto md:min-h-full relative">
                        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 flex items-center justify-center">
                            <div className="w-16 h-1 bg-gray-800 rounded-full" />
                        </div>
                        <div className="pt-6 h-full overflow-y-auto">
                            <SiteRenderer site={previewSite} isPro={isPro} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
