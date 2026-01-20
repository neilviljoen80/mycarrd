export interface OEmbedResponse {
    html: string;
    url: string;
    author_name: string;
    author_url: string;
    provider_name: string;
    provider_url: string;
    cache_age: string;
    width: number | null;
    height: number | null;
}

export async function fetchXEmbed(
    url: string
): Promise<{ html: string | null; error: string | null }> {
    try {
        // Validate URL is from X/Twitter
        if (!url.includes("twitter.com") && !url.includes("x.com")) {
            return { html: null, error: "URL must be from X/Twitter" };
        }

        const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(
            url
        )}&hide_thread=false`;

        const response = await fetch(oembedUrl);

        if (!response.ok) {
            return { html: null, error: "Failed to fetch embed" };
        }

        const data: OEmbedResponse = await response.json();

        return { html: data.html, error: null };
    } catch (error) {
        console.error("Error fetching X embed:", error);
        return { html: null, error: "Failed to fetch embed" };
    }
}
