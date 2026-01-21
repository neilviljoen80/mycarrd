export interface Link {
    title: string;
    url: string;
    icon: string;
}

export interface Embed {
    type: "x_thread";
    url: string;
}

export interface Template {
    id: string;
    name: string;
    category: "Profile" | "Landing" | "Portfolio" | "Blank";
    title: string;
    description: string;
    background_color: string;
    background_image_url?: string;
    links: Link[];
    embeds: Embed[];
    preview_image?: string;
    styles: {
        container: {
            maxWidth: string;
            padding: string;
            textAlign: "left" | "center" | "right";
            backgroundGradient?: string;
        };
        typography: {
            fontFamily: "sans" | "serif" | "mono" | "system-ui";
            headingSize: string;
            textColor: string;
        };
        buttons: {
            shape: "rounded" | "rounded-full" | "rounded-lg" | "rounded-none" | "pill" | "square";
            bgColor: string;
            hoverBg: string;
            shadow: "sm" | "md" | "lg" | "xl" | "none";
            border?: string;
            textColor?: string;
        };
        profile: {
            borderRadius: string;
            shadow: string;
            border: string;
        };
        sections: {
            spacing: string;
            cardBg: string;
            cardShadow: string;
            backdropBlur?: string;
        };
    };
}

const fallbackTemplate: Template = {
    id: "blank",
    name: "Blank Canvas",
    category: "Blank",
    title: "My Site",
    description: "Start from scratch and build exactly what you want.",
    background_color: "#1a1c23",
    links: [],
    embeds: [],
    styles: {
        container: { maxWidth: "600px", padding: "2rem", textAlign: "center" },
        typography: { fontFamily: "sans", headingSize: "2.5rem", textColor: "#ffffff" },
        buttons: { shape: "rounded-lg", bgColor: "#3b82f6", hoverBg: "#2563eb", shadow: "md", textColor: "#ffffff" },
        profile: { borderRadius: "50%", shadow: "md", border: "2px solid #ffffff" },
        sections: { spacing: "1.5rem", cardBg: "transparent", cardShadow: "none" }
    }
};

export const templates: Template[] = [
    {
        id: "minimal-bio-desert-glass",
        name: "Minimal Bio – Desert Glass",
        category: "Profile",
        title: "Jordan Ellis",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background_color: "#7a8a9a",
        background_image_url: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=2074&auto=format&fit=crop", // Scenic desert
        links: [
            { title: "@placeholder", url: "https://instagram.com/placeholder", icon: "instagram" },
            { title: "@placeholder", url: "https://tiktok.com/@placeholder", icon: "tiktok" },
            { title: "@placeholder", url: "https://x.com/placeholder", icon: "twitter" },
            { title: "Placeholder", url: "https://facebook.com/placeholder", icon: "facebook" },
            { title: "Email", url: "mailto:hello@example.com", icon: "mail" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=800&auto=format&fit=crop",
        styles: {
            container: {
                maxWidth: "600px",
                padding: "4rem 2rem",
                textAlign: "center"
            },
            typography: {
                fontFamily: "sans",
                headingSize: "3.5rem",
                textColor: "#ffffff"
            },
            buttons: {
                shape: "rounded-lg",
                bgColor: "rgba(255, 255, 255, 0.1)",
                hoverBg: "rgba(255, 255, 255, 0.2)",
                shadow: "none",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                textColor: "#ffffff"
            },
            profile: {
                borderRadius: "50%",
                shadow: "0 0 40px rgba(0,0,0,0.2)",
                border: "2px solid rgba(255, 255, 255, 0.4)"
            },
            sections: {
                spacing: "2.5rem",
                cardBg: "rgba(255, 255, 255, 0.05)",
                cardShadow: "xl",
                backdropBlur: "blur(20px)"
            }
        }
    }
];

export function getTemplateById(id: string): Template {
    return templates.find((t) => t.id === id) || fallbackTemplate;
}
