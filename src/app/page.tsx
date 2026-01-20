"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateGuestSiteButton } from "@/components/home/CreateGuestSiteButton";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/lib/templates";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Profile", "Landing", "Portfolio", "Blank"] as const;

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");
    const [hasDraft, setHasDraft] = useState(false);

    useEffect(() => {
        setHasDraft(!!localStorage.getItem("guest_site_draft"));
    }, []);

    const filteredTemplates = templates.filter(template =>
        activeCategory === "All" || template.category === activeCategory
    );

    return (
        <div className="min-h-screen bg-[#0c0c0e] text-white selection:bg-indigo-500 selection:text-white">
            {/* Header / Navigation */}
            <header className="container mx-auto px-4 py-6 flex items-center justify-between border-b border-white/5">
                <div className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    mycarrd
                </div>
                <div className="flex gap-4">
                    <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
                        <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-6">
                        <Link href="/templates">Start Free</Link>
                    </Button>
                </div>
            </header>

            {/* Draft Notification */}
            {hasDraft && (
                <div className="bg-indigo-600 py-3 text-center animate-in fade-in slide-in-from-top duration-500">
                    <Link href="/builder/new" className="flex items-center justify-center gap-2 text-sm font-bold hover:underline">
                        <span>You have an unsaved draft! Continue building where you left off</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            )}

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-24 text-center overflow-hidden relative">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] -z-10" />

                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
                    Welcome to <span className="text-indigo-500">mycarrd.online</span>
                </h1>
                <p className="text-xl md:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto font-medium">
                    Your free X-optimized link-in-bio. Built for creators who ship.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                    <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-transform hover:scale-105">
                        <Link href="/templates">Start Building Now</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white/10 hover:bg-white/5 rounded-full px-12 py-8 text-xl font-bold transition-transform hover:scale-105">
                        <Link href="/auth/login">Login to Dashboard</Link>
                    </Button>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-left py-16 border-t border-white/5 bg-black/20 backdrop-blur-sm rounded-3xl px-8">
                    <div className="space-y-3">
                        <div className="h-12 w-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        </div>
                        <h3 className="text-xl font-bold">Custom Subdomains</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">Grab your unique name instantly. Your site, your brand, no complex setup.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="h-12 w-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold">X Thread Embeds</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">Directly showcase your best threads and grow your X audience without them ever leaving.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="h-12 w-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold">Simple Builder</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">A fast, friction-free experience. Go from idea to published site in under 60 seconds.</p>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <main id="templates" className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                        Choose a Starting Point
                    </h2>
                    <p className="text-gray-400 text-lg">Every site can be fully customized after selection.</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === category
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {filteredTemplates.map((template) => (
                        <Card key={template.id} className="bg-[#141416] border-white/5 overflow-hidden group hover:ring-2 hover:ring-indigo-500 transition-all duration-500 rounded-3xl">
                            <CardContent className="p-0 relative aspect-[4/3]">
                                {template.preview_image ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                        style={{ backgroundImage: `url(${template.preview_image})` }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e2129]">
                                        <div className="w-20 h-20 border-2 border-dashed border-gray-600 rounded-2xl flex items-center justify-center mb-4">
                                            <div className="text-gray-600 text-3xl font-black">+</div>
                                        </div>
                                        <div className="text-gray-500 font-bold tracking-tight">Blank Canvas</div>
                                    </div>
                                )}

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-2xl font-black mb-3 italic uppercase">{template.name}</h3>
                                        <p className="text-sm text-gray-400 mb-8 max-w-xs">{template.description}</p>
                                        <CreateGuestSiteButton
                                            templateId={template.id}
                                            variant="default"
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-10 rounded-full shadow-2xl uppercase tracking-tighter"
                                        >
                                            Select Template
                                        </CreateGuestSiteButton>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-20 text-center border-t border-white/5">
                <div className="text-2xl font-black tracking-tighter text-indigo-500 mb-6">mycarrd</div>
                <div className="text-gray-500 text-sm space-y-2">
                    <p className="font-bold">Made for X creators, by creators.</p>
                    <p>© 2026 mycarrd.online. Inspired by simplicity.</p>
                </div>
            </footer>
        </div>
    );
}
