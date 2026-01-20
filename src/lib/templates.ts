import { Link, Embed } from "@/types/database";

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
        id: "blank",
        name: "Blank Page",
        category: "Blank",
        title: "My Site",
        description: "Start from scratch",
        background_color: "#ffffff",
        links: [],
        embeds: [],
    },
    {
        id: "minimal-bio",
        name: "Minimal Bio",
        category: "Profile",
        title: "About Me",
        description: "Clean link list + profile pic",
        background_color: "#ffffff",
        links: [
            { title: "Twitter / X", url: "https://x.com", icon: "twitter" },
            { title: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&auto=format&fit=crop&q=60",
    },
    {
        id: "x-thread",
        name: "X-Thread",
        category: "Landing",
        title: "Featured Story",
        description: "Featured X thread embed + links",
        background_color: "#f8fafc",
        links: [
            { title: "Read More threads", url: "https://x.com", icon: "twitter" },
        ],
        embeds: [
            {
                type: "x_thread",
                url: "https://twitter.com/X/status/1683326135114510336",
                html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">X is here! Follow us on <a href="https://t.co/l9uO7m1pZC">https://t.co/l9uO7m1pZC</a></p>&mdash; X (@X) <a href="https://twitter.com/X/status/1683326135114510336?ref_src=twsrc%5Etfw">July 24, 2023</a></blockquote>'
            }
        ],
        preview_image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60",
    },
    {
        id: "crypto",
        name: "Crypto Hub",
        category: "Portfolio",
        title: "My Portfolio",
        description: "Wallet preview + token links",
        background_color: "#0c0a09",
        links: [
            { title: "Buy My Token", url: "#", icon: "shoppingcart" },
            { title: "Discord", url: "#", icon: "messagecircle" },
            { title: "DexScanner", url: "#", icon: "globe" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60",
    },
    {
        id: "creator-hub",
        name: "Creator Hub",
        category: "Landing",
        title: "Get My Content",
        description: "Subscription CTAs + teaser images",
        background_color: "#fff1f2",
        links: [
            { title: "Subscribe on Whop", url: "#", icon: "shoppingcart" },
            { title: "Course Login", url: "#", icon: "info" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop&q=60",
    },
    {
        id: "indie-progress",
        name: "Indie Progress",
        category: "Portfolio",
        title: "Building in Public",
        description: "Milestone counters + shipped items",
        background_color: "#f0fdf4",
        links: [
            { title: "Ship #1", url: "#", icon: "code" },
            { title: "Ship #2", url: "#", icon: "code" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1522071823991-b99c223a70ad?w=800&auto=format&fit=crop&q=60",
    },
    {
        id: "dark-minimal",
        name: "Dark Minimal",
        category: "Profile",
        title: "I Build Things",
        description: "Dark mode X-style bio",
        background_color: "#000000",
        links: [
            { title: "X.com", url: "https://x.com", icon: "twitter" },
            { title: "GitHub", url: "https://github.com", icon: "github" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    }
];

export function getTemplateById(id: string): Template {
    return templates.find(t => t.id === id) || templates[0];
}
