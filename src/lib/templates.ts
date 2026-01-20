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
        id: "profile-alex",
        name: "Alex Murphy",
        category: "Profile",
        title: "Alex Murphy",
        description: "Senior artist, codebreaker, wanderer",
        background_color: "#1a1a1a",
        links: [
            { title: "Twitter", url: "https://twitter.com", icon: "Twitter" },
            { title: "Instagram", url: "https://instagram.com", icon: "Instagram" },
            { title: "GitHub", url: "https://github.com", icon: "Github" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    },
    {
        id: "landing-product",
        name: "Product Landing",
        category: "Landing",
        title: "Our New Product",
        description: "A simple landing page for your next big idea.",
        background_color: "#f3f4f6",
        links: [
            { title: "Learn More", url: "#", icon: "Info" },
            { title: "Order Now", url: "#", icon: "ShoppingCart" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    },
    {
        id: "portfolio-dev",
        name: "Developer Portfolio",
        category: "Portfolio",
        title: "John Doe | Developer",
        description: "Building the future of the web.",
        background_color: "#0f172a",
        links: [
            { title: "Projects", url: "#", icon: "Code" },
            { title: "Resume", url: "#", icon: "FileText" },
            { title: "Contact", url: "#", icon: "Mail" },
        ],
        embeds: [],
        preview_image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    }
];

export function getTemplateById(id: string): Template {
    return templates.find(t => t.id === id) || templates[0];
}
