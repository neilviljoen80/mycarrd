export function parseSubdomain(host: string): string | null {
    // Remove port if present
    const hostname = host.split(":")[0];

    // Split by dots
    const parts = hostname.split(".");

    // localhost handling
    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return null;
    }

    // Check for subdomain.localhost pattern (for local testing)
    if (parts.length === 2 && parts[1] === "localhost") {
        return parts[0];
    }

    // For production: subdomain.mycarrd.online
    // Should have at least 3 parts (subdomain, mycarrd, online)
    if (parts.length >= 3) {
        // Check if it's the main domain
        const domain = parts.slice(-2).join(".");
        if (domain === "mycarrd.online") {
            // If there are more parts, the first one is the subdomain
            if (parts.length > 2) {
                return parts[0];
            }
        }
    }

    return null;
}

export function isCustomDomain(host: string): boolean {
    const hostname = host.split(":")[0];

    // Not a custom domain if localhost
    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return false;
    }

    // Not a custom domain if it's a subdomain.localhost pattern
    if (hostname.endsWith(".localhost")) {
        return false;
    }

    // Not a custom domain if it's mycarrd.online or *.mycarrd.online
    if (
        hostname === "mycarrd.online" ||
        hostname.endsWith(".mycarrd.online")
    ) {
        return false;
    }

    // Everything else is a custom domain
    return true;
}

export function generateSubdomain(username: string): string {
    // Clean username: lowercase, remove special chars
    const cleanUsername = username
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    // Add random suffix to ensure uniqueness
    const randomSuffix = Math.random().toString(36).substring(2, 6);

    return `${cleanUsername}${randomSuffix}`;
}
