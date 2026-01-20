"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/lib/supabase/storage";

interface ImageUploadProps {
    currentUrl: string | null;
    onUpload: (url: string) => void;
}

export function ImageUpload({ currentUrl, onUpload }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(currentUrl);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        setUploading(true);

        try {
            const { url, error } = await uploadImage(file, "profile-images");

            if (error || !url) {
                throw new Error("Failed to upload image");
            }

            setPreviewUrl(url);
            onUpload(url);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        onUpload("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            {previewUrl ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                    <Image
                        src={previewUrl}
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    <Upload className="h-8 w-8" />
                </div>
            )}

            <div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                />
                <Button
                    asChild
                    variant="outline"
                    disabled={uploading}
                >
                    <label htmlFor="image-upload" className="cursor-pointer">
                        {uploading ? "Uploading..." : "Choose Image"}
                    </label>
                </Button>
            </div>
        </div>
    );
}
