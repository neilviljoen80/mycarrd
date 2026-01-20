"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        setLoading(false);

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Check your email for the magic link!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Welcome to mycarrd</CardTitle>
                    <CardDescription>
                        Enter your email to receive a magic link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Magic Link"}
                        </Button>
                    </form>

                    {message && (
                        <div className={`mt-4 p-3 rounded-md text-sm ${message.includes("Check your email")
                                ? "bg-green-50 text-green-800"
                                : "bg-red-50 text-red-800"
                            }`}>
                            {message}
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-muted-foreground hover:underline">
                            Back to home
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
