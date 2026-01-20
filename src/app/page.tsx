import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-6xl font-bold text-gray-900 mb-6">
                        Your link-in-bio,<br />
                        <span className="text-indigo-600">beautifully simple</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Create stunning one-page websites with custom subdomains, X thread embeds, and more.
                        No coding required.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/auth/login">Get Started Free</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="#pricing">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Easy Builder</CardTitle>
                            <CardDescription>
                                Intuitive drag-and-drop interface to create your perfect page
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Subdomains</CardTitle>
                            <CardDescription>
                                Get your own subdomain like yourname.mycarrd.online instantly
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>X/Twitter Embeds</CardTitle>
                            <CardDescription>
                                Embed your best threads directly on your page
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Simple Pricing
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Free</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold text-gray-900">$0</span>
                                <span className="text-gray-600">/forever</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Up to 3 sites</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Custom subdomain</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>X/Twitter embeds</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Unlimited links</span>
                                </li>
                            </ul>
                            <Button asChild className="w-full mt-6">
                                <Link href="/auth/login">Start Free</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Pro Tier */}
                    <Card className="border-2 border-indigo-600">
                        <CardHeader>
                            <CardTitle className="text-indigo-600">Pro</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold text-gray-900">$9</span>
                                <span className="text-gray-600">/year</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Unlimited sites</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Custom domain</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>No branding badge</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Everything in Free</span>
                                </li>
                            </ul>
                            <Button asChild className="w-full mt-6" variant="default">
                                <Link href="/upgrade">Upgrade to Pro</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t bg-white">
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-gray-600">
                        © 2026 mycarrd.online. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
