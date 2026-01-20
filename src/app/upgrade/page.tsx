"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Button asChild variant="ghost">
                        <Link href="/dashboard">← Back to Dashboard</Link>
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">Upgrade to Pro</h1>
                    <p className="text-xl text-gray-600">
                        Unlock unlimited sites, custom domains, and remove branding
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <Card className="border-2 border-indigo-600">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Pro Plan</CardTitle>
                            <CardDescription className="text-2xl font-bold text-gray-900 mt-2">
                                $9 <span className="text-base font-normal text-gray-600">/year</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span>Unlimited sites</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span>Custom domain support</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span>Remove "Made with mycarrd.online" badge</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span>Priority support</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span>All free features included</span>
                                </li>
                            </ul>

                            {/* Whop Checkout Integration */}
                            <div className="border rounded-lg p-6 bg-gray-50 text-center">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Whop checkout will be embedded here
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Configure your WHOP_PLAN_ID environment variable to enable checkout
                                </p>
                                {/* 
                  To integrate Whop checkout, uncomment and configure:
                  
                  <WhopCheckoutEmbed 
                    planId={process.env.NEXT_PUBLIC_WHOP_PLAN_ID} 
                    skipRedirect={true}
                  />
                */}
                            </div>

                            <div className="text-center">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/dashboard">Maybe Later</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
