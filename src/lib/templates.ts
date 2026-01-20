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

export const templates: Template[] = [];

export function getTemplateById(id: string): Template {
    return templates.find((t) => t.id === id) || fallbackTemplate;
}
