export interface User {
    id: string;
    email: string;
    username: string;
    is_pro: boolean;
    created_at: string;
}

export interface Link {
    title: string;
    url: string;
    icon: string;
}

export interface Embed {
    type: "x_thread";
    url: string;
    html: string;
}

export interface Site {
    id: string;
    user_id: string;
    subdomain: string;
    title: string;
    description: string;
    profile_image_url: string | null;
    links: Link[];
    embeds: Embed[];
    background_color: string;
    background_image_url: string | null;
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
    is_published: boolean;
    custom_domain: string | null;
    created_at: string;
}

export interface Database {
    public: {
        Tables: {
            users: {
                Row: User;
                Insert: Omit<User, "id" | "created_at">;
                Update: Partial<Omit<User, "id" | "created_at">>;
            };
            sites: {
                Row: Site;
                Insert: Omit<Site, "id" | "created_at">;
                Update: Partial<Omit<Site, "id" | "created_at">>;
            };
        };
    };
}
