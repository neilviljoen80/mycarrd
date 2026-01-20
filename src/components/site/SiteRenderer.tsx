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

    const styles = site.styles || {
        container: { maxWidth: "600px", padding: "2rem", textAlign: "center" as const },
        typography: { fontFamily: "sans" as const, headingSize: "2.5rem", textColor: "#ffffff" },
        buttons: { shape: "rounded-lg" as const, bgColor: "#3b82f6", hoverBg: "#2563eb", shadow: "md" as const, textColor: "#ffffff" },
        profile: { borderRadius: "50%", shadow: "md", border: "2px solid #ffffff" },
        sections: { spacing: "1.5rem", cardBg: "transparent", cardShadow: "none" }
    };

    const fontClass = {
        sans: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
        "system-ui": "font-sans",
    }[styles.typography.fontFamily];

    const textAlignClass = {
        left: "text-left items-start",
        center: "text-center items-center",
        right: "text-right items-end",
    }[styles.container.textAlign];

    const buttonRadiusClass = {
        rounded: "rounded",
        "rounded-full": "rounded-full",
        "rounded-lg": "rounded-lg",
        "rounded-none": "rounded-none",
        pill: "rounded-[9999px]",
        square: "rounded-none",
    }[styles.buttons.shape];

    const shadowClass = {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
    };

    return (
        <div
            className={`min-h-screen flex flex-col justify-center p-4 transition-all duration-500 ${styles.container.backgroundGradient || ""}`}
            style={{
                backgroundColor: site.background_color,
                fontFamily: styles.typography.fontFamily === "system-ui" ? "system-ui, -apple-system, sans-serif" : undefined
            }}
        >
            <div
                className={`w-full mx-auto flex flex-col ${textAlignClass} ${fontClass}`}
                style={{
                    maxWidth: styles.container.maxWidth,
                    padding: styles.container.padding,
                    gap: styles.sections.spacing,
                }}
            >
                {/* Profile Section */}
                <div className={`space-y-4 w-full flex flex-col ${textAlignClass}`}>
                    {site.profile_image_url && (
                        <div
                            className="relative w-32 h-32 overflow-hidden overflow-hidden transition-transform hover:scale-105 duration-300"
                            style={{
                                borderRadius: styles.profile.borderRadius,
                                boxShadow: styles.profile.shadow === "none" ? "none" : (styles.profile.shadow.includes("px") ? styles.profile.shadow : undefined),
                                border: styles.profile.border,
                            }}
                        >
                            <Image
                                src={site.profile_image_url}
                                alt={site.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <h1
                        className="font-bold tracking-tight"
                        style={{
                            fontSize: styles.typography.headingSize,
                            color: styles.typography.textColor
                        }}
                    >
                        {site.title}
                    </h1>
                    {site.description && (
                        <p
                            className="text-lg opacity-90"
                            style={{ color: styles.typography.textColor }}
                        >
                            {site.description}
                        </p>
                    )}
                </div>

                {/* Links */}
                {site.links.length > 0 && (
                    <div className="w-full" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {site.links.map((link, index) => {
                            const Icon = iconMap[link.icon] || LinkIcon;
                            return (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group block w-full transition-all duration-300 hover:scale-[1.02] ${buttonRadiusClass} ${shadowClass[styles.buttons.shadow]}`}
                                    style={{
                                        backgroundColor: styles.buttons.bgColor,
                                        border: styles.buttons.border,
                                        padding: "1rem"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (styles.buttons.hoverBg) e.currentTarget.style.backgroundColor = styles.buttons.hoverBg;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = styles.buttons.bgColor;
                                    }}
                                >
                                    <div
                                        className="flex items-center justify-center gap-3"
                                        style={{ color: styles.buttons.textColor || styles.typography.textColor }}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="font-semibold">{link.title}</span>
                                        <ExternalLink className="h-4 w-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* X/Twitter Embeds */}
                {site.embeds.length > 0 && (
                    <div className="w-full" style={{ display: "flex", flexDirection: "column", gap: styles.sections.spacing }}>
                        {site.embeds.map((embed, index) => (
                            <div
                                key={index}
                                className={`p-4 flex justify-center w-full ${shadowClass[styles.sections.cardShadow as keyof typeof shadowClass] || "shadow-none"}`}
                                style={{
                                    backgroundColor: styles.sections.cardBg,
                                    borderRadius: styles.buttons.shape === "rounded-full" ? "1.5rem" : "0.5rem"
                                }}
                            >
                                <div className="w-full max-w-full overflow-hidden flex justify-center" dangerouslySetInnerHTML={{ __html: embed.html }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Badge for Free Tier */}
                {!isPro && (
                    <div className="text-center pt-8 w-full">
                        <a
                            href="https://mycarrd.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm opacity-60 hover:opacity-100 transition-opacity underline decoration-dotted"
                            style={{ color: styles.typography.textColor }}
                        >
                            Made with mycarrd.online
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
