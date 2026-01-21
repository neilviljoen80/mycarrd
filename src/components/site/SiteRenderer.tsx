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
            className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-700 relative overflow-hidden ${styles.container.backgroundGradient || ""}`}
            style={{
                backgroundColor: site.background_color,
                backgroundImage: site.background_image_url ? `url(${site.background_image_url})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                fontFamily: styles.typography.fontFamily === "system-ui" ? "system-ui, -apple-system, sans-serif" : undefined
            }}
        >
            {/* Background Overlay */}
            {site.background_image_url && (
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            )}

            <div
                className={`w-full mx-auto flex flex-col relative z-10 ${textAlignClass} ${fontClass}`}
                style={{
                    maxWidth: styles.container.maxWidth,
                    padding: styles.container.padding,
                    gap: styles.sections.spacing,
                }}
            >
                {/* Profile Section */}
                <div className={`space-y-6 w-full flex flex-col ${textAlignClass}`}>
                    {site.profile_image_url && (
                        <div
                            className="relative w-32 h-32 overflow-hidden transition-all hover:scale-105 duration-500"
                            style={{
                                borderRadius: styles.profile.borderRadius,
                                boxShadow: styles.profile.shadow.includes(" ") ? styles.profile.shadow : (shadowClass[styles.profile.shadow as keyof typeof shadowClass] || "none"),
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
                    <div className="space-y-4">
                        <h1
                            className="font-bold tracking-tight leading-tight"
                            style={{
                                fontSize: styles.typography.headingSize,
                                color: styles.typography.textColor
                            }}
                        >
                            {site.title}
                        </h1>
                        {site.description && (
                            <p
                                className="text-xl opacity-90 max-w-lg leading-relaxed"
                                style={{ color: styles.typography.textColor }}
                            >
                                {site.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Links Container (Glass effect if specified) */}
                {site.links.length > 0 && (
                    <div
                        className={`w-full ${shadowClass[styles.sections.cardShadow as keyof typeof shadowClass] || "shadow-none"}`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            backgroundColor: styles.sections.cardBg !== "transparent" ? styles.sections.cardBg : undefined,
                            backdropFilter: styles.sections.backdropBlur,
                            WebkitBackdropFilter: styles.sections.backdropBlur,
                            padding: styles.sections.cardBg !== "transparent" ? "2.5rem" : "0",
                            borderRadius: "1.5rem",
                            border: styles.sections.cardBg !== "transparent" ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
                        }}
                    >
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
                                        padding: "1.25rem"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (styles.buttons.hoverBg) e.currentTarget.style.backgroundColor = styles.buttons.hoverBg;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = styles.buttons.bgColor;
                                    }}
                                >
                                    <div
                                        className="flex items-center justify-center gap-4"
                                        style={{ color: styles.buttons.textColor || styles.typography.textColor }}
                                    >
                                        <Icon className="h-6 w-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <span className="font-bold text-lg">{link.title}</span>
                                        <ExternalLink className="h-4 w-4 ml-auto opacity-30 group-hover:opacity-70 transition-opacity" />
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
                                    borderRadius: styles.buttons.shape === "rounded-full" ? "1.5rem" : "0.5rem",
                                    backdropFilter: styles.sections.backdropBlur,
                                    WebkitBackdropFilter: styles.sections.backdropBlur,
                                }}
                            >
                                <div className="w-full max-w-full overflow-hidden flex justify-center" dangerouslySetInnerHTML={{ __html: embed.html }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Badge for Free Tier */}
                {!isPro && (
                    <div className="text-center pt-12 w-full">
                        <a
                            href="https://mycarrd.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity underline decoration-dotted underline-offset-4"
                            style={{ color: styles.typography.textColor }}
                        >
                            MADE WITH MYCARRD.ONLINE
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
