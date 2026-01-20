"use client";

import { useEffect } from "react";
import type { Site } from "@/types/database";
import Image from "next/image";
import {
    ExternalLink,
    Link as LinkIcon,
    Twitter,
    Instagram,
    Youtube,
    Github,
    Linkedin,
    Facebook,
    Mail,
    Globe,
    Info,
    ShoppingCart,
    Code,
    FileText,
    MessageCircle
} from "lucide-react";

interface SiteRendererProps {
    site: Site;
    isPro: boolean;
}

const iconMap: Record<string, any> = {
    // Legacy / Normalized keys
    link: LinkIcon,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    github: Github,
    linkedin: Linkedin,
    facebook: Facebook,
    email: Mail,
    mail: Mail,
    globe: Globe,
    tiktok: LinkIcon,
    // New keys from templates
    info: Info,
    shoppingcart: ShoppingCart,
    code: Code,
    filetext: FileText,
    messagecircle: MessageCircle,
    // Title case fallback
    Twitter: Twitter,
    Instagram: Instagram,
    Github: Github,
    Info: Info,
    ShoppingCart: ShoppingCart,
    Code: Code,
    FileText: FileText,
    Mail: Mail,
};

export function SiteRenderer({ site, isPro }: SiteRendererProps) {
    useEffect(() => {
        // Load Twitter widgets script
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{ backgroundColor: site.background_color }}
        >
            <div className="w-full max-w-2xl space-y-8">
                {/* Profile Section */}
                <div className="text-center space-y-4">
                    {site.profile_image_url && (
                        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                                src={site.profile_image_url}
                                alt={site.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <h1 className="text-4xl font-bold text-gray-900">{site.title}</h1>
                    {site.description && (
                        <p className="text-lg text-gray-700">{site.description}</p>
                    )}
                </div>

                {/* Links */}
                {site.links.length > 0 && (
                    <div className="space-y-3">
                        {site.links.map((link, index) => {
                            const Icon = iconMap[link.icon] || LinkIcon;
                            return (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-white hover:bg-gray-50 border-2 border-gray-900 rounded-lg p-4 transition-all hover:scale-105 shadow-md"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <Icon className="h-5 w-5" />
                                        <span className="font-semibold">{link.title}</span>
                                        <ExternalLink className="h-4 w-4 ml-auto" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* X/Twitter Embeds */}
                {site.embeds.length > 0 && (
                    <div className="space-y-6">
                        {site.embeds.map((embed, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-4 shadow-md flex justify-center"
                            >
                                <div dangerouslySetInnerHTML={{ __html: embed.html }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Badge for Free Tier */}
                {!isPro && (
                    <div className="text-center pt-8">
                        <a
                            href="https://mycarrd.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                        >
                            Made with mycarrd.online
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
