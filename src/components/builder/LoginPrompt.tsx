"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Mail } from "lucide-react";

interface LoginPromptProps {
    isOpen: boolean;
    onClose: () => void;
    draftData: any;
}

export function LoginPrompt({ isOpen, onClose, draftData }: LoginPromptProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Store draft in localStorage before redirecting/waiting
            localStorage.setItem("guest_site_draft", JSON.stringify(draftData));

            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback?next=/builder/new`,
                },
            });

            if (error) throw error;

            setMessage({
                type: "success",
                text: "Check your email for the magic link! After logging in, you'll be redirected back here to finish publishing.",
            });
        } catch (error: any) {
            setMessage({ type: "error", text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#1a1c23] text-white border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Sign up to Publish</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        You're so close! Enter your email to save this site and publish it to your own subdomain.
                    </DialogDescription>
                </DialogHeader>

                {message ? (
                    <div className={`p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {message.text}
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:ring-indigo-500"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-lg transition-transform active:scale-95"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Mail className="h-5 w-5 mr-2" />}
                            Send Magic Link
                        </Button>
                    </form>
                )}

                <DialogFooter className="sm:justify-center">
                    <p className="text-xs text-gray-500 text-center">
                        By signing up, you agree to our Terms and Privacy Policy.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
