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
    const [showUI, setShowUI] = useState(true);
    const [activeTab, setActiveTab] = useState<"info" | "links" | "media">("info");

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
                            onClick={() => setShowUI(!showUI)}
                        >
                            {showUI ? <Eye className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2 text-indigo-500" />}
                            {showUI ? "Hide UI" : "Show UI"}
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

            {/* Full-screen Background Preview */}
            <div className="fixed inset-0 pt-[73px] overflow-auto">
                <SiteRenderer site={previewSite} isPro={isPro} />
            </div>

            {/* Overlaid Editor Controls */}
            {showUI && (
                <div className="fixed top-[100px] left-4 md:left-8 w-full max-w-sm z-20 transition-all duration-300">
                    <Card className="bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden max-h-[calc(100vh-140px)] flex flex-col">
                        <CardHeader className="p-4 border-b">
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab("info")}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === "info" ? "bg-white shadow-sm" : "text-gray-500"}`}
                                >
                                    Site Info
                                </button>
                                <button
                                    onClick={() => setActiveTab("links")}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === "links" ? "bg-white shadow-sm" : "text-gray-500"}`}
                                >
                                    Links
                                </button>
                                <button
                                    onClick={() => setActiveTab("media")}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === "media" ? "bg-white shadow-sm" : "text-gray-500"}`}
                                >
                                    Style
                                </button>
                            </div>
                        </CardHeader>

                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {activeTab === "info" && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Site Title</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="h-11 rounded-lg focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={2}
                                            className="rounded-lg resize-none min-h-[80px]"
                                        />
                                    </div>
                                    <div className="space-y-2 pt-2 border-t">
                                        <Label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Profile Image</Label>
                                        <ImageUpload
                                            currentUrl={profileImageUrl}
                                            onUpload={(url) => setProfileImageUrl(url)}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "links" && (
                                <div className="space-y-4">
                                    <Label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Buttons & Social Links</Label>
                                    <LinkEditor links={links} onChange={setLinks} />
                                </div>
                            )}

                            {activeTab === "media" && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Background Color</Label>
                                        <div className="flex gap-3">
                                            <input
                                                type="color"
                                                value={backgroundColor}
                                                onChange={(e) => setBackgroundColor(e.target.value)}
                                                className="h-11 w-11 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                                            />
                                            <Input
                                                value={backgroundColor}
                                                onChange={(e) => setBackgroundColor(e.target.value)}
                                                className="flex-1 h-11"
                                            />
                                        </div>
                                    </div>

                                    {isPro && (
                                        <div className="space-y-3 pt-4 border-t">
                                            <Label htmlFor="custom-domain" className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Custom Domain</Label>
                                            <Input
                                                id="custom-domain"
                                                value={customDomain}
                                                onChange={(e) => setCustomDomain(e.target.value)}
                                                placeholder="yourdomain.com"
                                                className="h-11"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t bg-gray-50/50 flex justify-between items-center">
                            <p className="text-[10px] text-gray-400 font-medium">Auto-saving draft...</p>
                            <div className="flex gap-2">
                                {/* Optional: Add more context actions here */}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
