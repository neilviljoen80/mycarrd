"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateGuestSiteButton } from "@/components/home/CreateGuestSiteButton";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/lib/templates";

const categories = ["All", "Profile", "Landing", "Portfolio", "Blank"] as const;

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");

    const filteredTemplates = templates.filter(template =>
        activeCategory === "All" || template.category === activeCategory
    );

    return (
        <div className="min-h-screen bg-[#1a1c23] text-white selection:bg-indigo-500 selection:text-white">
            {/* Header / Navigation */}
            <header className="container mx-auto px-4 py-8 flex items-center justify-between">
                <div className="text-2xl font-bold tracking-tighter">mycarrd</div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`transition-colors duration-200 hover:text-white ${activeCategory === category ? "text-indigo-400 border-b-2 border-indigo-400 pb-1" : ""
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </nav>
                <div className="flex gap-4">
                    <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
                        <Link href="/auth/login">Login</Link>
                    </Button>
                    <Link href="/auth/login">
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            Get Started (free)
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center bg-gradient-to-b from-indigo-900/10 to-transparent">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    Welcome to mycarrd.online
                </h1>
                <p className="text-xl md:text-2xl text-indigo-200 mb-8 max-w-3xl mx-auto">
                    Create your free link-in-bio in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <CreateGuestSiteButton size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 px-12 py-6 text-lg rounded-full shadow-xl">
                        Start Building Now
                    </CreateGuestSiteButton>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left py-12 border-t border-white/5">
                    <div>
                        <h3 className="text-indigo-400 font-bold mb-2">Custom Subdomains</h3>
                        <p className="text-gray-400 text-sm">Grab your unique name instantly. No complex setup.</p>
                    </div>
                    <div>
                        <h3 className="text-indigo-400 font-bold mb-2">Easy X Thread Embeds</h3>
                        <p className="text-gray-400 text-sm">Showcase your best content directly on your page.</p>
                    </div>
                    <div>
                        <h3 className="text-indigo-400 font-bold mb-2">Simple Builder</h3>
                        <p className="text-gray-400 text-sm">Drag-and-drop experience. No coding required.</p>
                    </div>
                </div>
            </section>

            {/* Main Section */}
            <main id="templates" className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    Choose a Starting Point
                </h2>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredTemplates.map((template) => (
                        <Card key={template.id} className="bg-[#2a2d37] border-0 overflow-hidden group hover:ring-2 hover:ring-indigo-500 transition-all duration-300">
                            <CardContent className="p-0 relative aspect-[4/3]">
                                {template.preview_image ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${template.preview_image})` }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e2129]">
                                        <div className="w-20 h-20 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-4">
                                            <div className="text-gray-600 text-2xl font-bold">+</div>
                                        </div>
                                        <div className="text-gray-500 font-medium">Blank Canvas</div>
                                    </div>
                                )}

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                                        <p className="text-sm text-gray-300 mb-6">{template.description}</p>
                                        <CreateGuestSiteButton
                                            templateId={template.id}
                                            variant="default"
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
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
            <footer className="container mx-auto px-4 py-16 text-center text-gray-500 text-sm border-t border-white/5">
                <p className="mb-2">Made for X creators.</p>
                <p>© 2026 mycarrd.online. Inspired by simplicity.</p>
            </footer>
        </div>
    );
}
