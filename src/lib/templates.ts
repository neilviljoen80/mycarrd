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
    style?: {
        buttonShape?: "rounded" | "pill" | "square";
        cardStyle?: "glass" | "solid" | "outlined" | "none";
        fontFamily?: "sans" | "serif" | "mono";
        textAlign?: "left" | "center" | "right";
    };
}

export const templates: Template[] = [
    {
        id: "minimal-bio",
        name: "Minimal Bio",
        category: "Profile",
        title: "I Build Things",
        description: "A clean, dark bio link for developers and builders.",
        background_color: "#000000",
        links: [
            { title: "X", url: "https://x.com", icon: "twitter" },
            { title: "GitHub", url: "https://github.com", icon: "github" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "rounded", cardStyle: "solid", fontFamily: "sans", textAlign: "center" }
    },
    {
        id: "x-thread",
        name: "X Thread Focus",
        category: "Landing",
        title: "Latest Thoughts",
        description: "Perfect for showcasing your best X threads and writing.",
        background_color: "#15202b",
        links: [
            { title: "Follow me on X", url: "https://x.com", icon: "twitter" },
        ],
        embeds: [
            { type: "x_thread", url: "https://x.com/jack/status/20" }
        ],
        preview_image: "https://images.unsplash.com/photo-1611605698335-8b1c336e0d9d?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "pill", cardStyle: "solid", fontFamily: "sans", textAlign: "center" }
    },
    {
        id: "crypto",
        name: "Crypto Wallet",
        category: "Portfolio",
        title: "My Web3 Identity",
        description: "Display your wallets and decentralized project links.",
        background_color: "#0f172a",
        links: [
            { title: "Ethereum", url: "0x...", icon: "wallet" },
            { title: "Solana", url: "...", icon: "wallet" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "square", cardStyle: "outlined", fontFamily: "mono", textAlign: "left" }
    },
    {
        id: "creator-hub",
        name: "Creator Hub",
        category: "Landing",
        title: "Join My World",
        description: "The central port for all your content channels.",
        background_color: "#18181b",
        links: [
            { title: "YouTube", url: "https://youtube.com", icon: "youtube" },
            { title: "Newsletter", url: "https://substack.com", icon: "mail" },
            { title: "Instagram", url: "https://instagram.com", icon: "instagram" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1492619334764-bb669e47a984?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "rounded", cardStyle: "glass", fontFamily: "sans", textAlign: "center" }
    },
    {
        id: "indie-progress",
        name: "Building in Public",
        category: "Landing",
        title: "Ship Logs",
        description: "Track your progress and share your journey as an indie hacker.",
        background_color: "#0c0a09",
        links: [
            { title: "Product Hunt", url: "https://producthunt.com", icon: "rocket" },
            { title: "Current Project", url: "https://mycarrd.online", icon: "globe" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "rounded", cardStyle: "solid", fontFamily: "sans", textAlign: "left" }
    },
    {
        id: "adventure-card",
        name: "Adventure Card",
        category: "Profile",
        title: "Ann Lewis",
        description: "A photo-first card perfect for travel and lifestyle.",
        background_color: "#f0ebe1",
        links: [
            { title: "Instagram", url: "https://instagram.com", icon: "instagram" },
            { title: "Facebook", url: "https://facebook.com", icon: "facebook" },
            { title: "Email Me", url: "mailto:ann@example.com", icon: "mail" }
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1502014822147-1aed80671e0a?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "pill", cardStyle: "solid", fontFamily: "sans", textAlign: "center" }
    },
    {
        id: "horizon-bio",
        name: "Horizon Bio",
        category: "Landing",
        title: "Rachael Deckard",
        description: "Scenic full-width background with a glassy feel.",
        background_color: "#2d3748",
        links: [
            { title: "Instagram", url: "https://instagram.com", icon: "instagram" },
            { title: "Message", url: "#", icon: "messagecircle" },
            { title: "Email", url: "mailto:rachael@example.com", icon: "mail" }
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "pill", cardStyle: "glass", fontFamily: "sans", textAlign: "center" }
    },
    {
        id: "geometric-minimal",
        name: "Geometric Minimal",
        category: "Profile",
        title: "Cayce Pollard",
        description: "Elegant serif typography on a clean cream background.",
        background_color: "#fdfbf7",
        links: [
            { title: "GitHub", url: "https://github.com", icon: "github" },
            { title: "TikTok", url: "https://tiktok.com", icon: "tiktok" },
            { title: "Email", url: "mailto:cayce@example.com", icon: "mail" }
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "square", cardStyle: "none", fontFamily: "serif", textAlign: "center" }
    },
    {
        id: "saas-lander",
        name: "SaaS Focus",
        category: "Landing",
        title: "Magna Feugiat",
        description: "Dark, tech-focused template for product launches.",
        background_color: "#0f172a",
        links: [
            { title: "Get Started", url: "#signup", icon: "rocket" },
            { title: "Documentation", url: "#docs", icon: "filetext" }
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "rounded", cardStyle: "none", fontFamily: "sans", textAlign: "left" }
    },
    {
        id: "soft-professional",
        name: "Soft Professional",
        category: "Profile",
        title: "Olivia Dunham",
        description: "Warm, centered design for consultants and creatives.",
        background_color: "#fffaf0",
        links: [
            { title: "Get in touch", url: "mailto:olivia@example.com", icon: "mail" },
            { title: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
            { title: "X", url: "https://x.com", icon: "twitter" }
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "pill", cardStyle: "solid", fontFamily: "serif", textAlign: "center" }
    },
    {
        id: "bold-portfolio",
        name: "Bold Portfolio",
        category: "Portfolio",
        title: "Daniel Jackson",
        description: "High contrast dark mode with bold typography.",
        background_color: "#111827",
        links: [
            { title: "X", url: "https://x.com", icon: "twitter" },
            { title: "Instagram", url: "https://instagram.com", icon: "instagram" },
            { title: "Email", url: "mailto:daniel@example.com", icon: "mail" }
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
        style: { buttonShape: "rounded", cardStyle: "none", fontFamily: "sans", textAlign: "right" }
    },
    {
        id: "blank",
        name: "Blank Canvas",
        category: "Blank",
        title: "My Site",
        description: "Start from scratch and build exactly what you want.",
        background_color: "#1a1c23",
        links: [],
        embeds: [],
        style: { buttonShape: "rounded", cardStyle: "none", fontFamily: "sans", textAlign: "center" }
    }
];

export function getTemplateById(id: string): Template {
    return templates.find((t) => t.id === id) || templates[templates.length - 1];
}
