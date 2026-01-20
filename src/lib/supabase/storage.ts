import { createClient } from "./client";

export async function uploadImage(
    file: File,
    path: string
): Promise<{ url: string | null; error: Error | null }> {
    const supabase = createClient();

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (uploadError) {
        return { url: null, error: uploadError };
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from("site-images").getPublicUrl(filePath);

    return { url: publicUrl, error: null };
}

export async function deleteImage(url: string): Promise<{ error: Error | null }> {
    const supabase = createClient();

    // Extract path from public URL
    const urlParts = url.split("/");
    const path = urlParts.slice(urlParts.indexOf("site-images") + 1).join("/");

    const { error } = await supabase.storage.from("site-images").remove([path]);

    return { error };
}
