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
    }
];

export function getTemplateById(id: string): Template {
    return templates.find((t) => t.id === id) || templates[templates.length - 1];
}
