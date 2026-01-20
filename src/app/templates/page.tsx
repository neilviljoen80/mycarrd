"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { templates } from "@/lib/templates";
import { ArrowLeft, Rocket, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TemplatesPage() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#1a1c23] text-white selection:bg-indigo-500 selection:text-white">
            {/* Navigation */}
            <nav className="border-b border-white/5 bg-[#1a1c23]/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Link>
                        </Button>
                        <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
                        <span className="text-xl font-bold tracking-tight hidden md:block">Choose a Template</span>
                    </div>
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search templates..."
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-full h-10 focus-visible:ring-indigo-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Starter Templates</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Pick a starting point for your project. You can customize everything later in the builder.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredTemplates.map((template) => (
                        <Card
                            key={template.id}
                            className="bg-[#2a2d37] border-0 overflow-hidden group hover:ring-2 hover:ring-indigo-500 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                {template.preview_image ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${template.preview_image})` }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-indigo-900/20 flex items-center justify-center">
                                        <CardTitle className="text-indigo-400/50">{template.name}</CardTitle>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                    <Button
                                        onClick={() => router.push(`/builder/new?template=${template.id}`)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-8 rounded-full shadow-lg"
                                    >
                                        Use This Template
                                    </Button>
                                </div>
                            </div>
                            <CardHeader className="p-5 flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">
                                        {template.category}
                                    </span>
                                </div>
                                <CardTitle className="text-xl text-white group-hover:text-indigo-400 transition-colors">
                                    {template.name}
                                </CardTitle>
                                <CardDescription className="text-gray-400 line-clamp-2 mt-2">
                                    {template.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-gray-500 italic">No templates found matching your search.</p>
                        <Button variant="link" onClick={() => setSearch("")} className="text-indigo-400">
                            Clear search
                        </Button>
                    </div>
                )}
            </main>

            <footer className="container mx-auto px-4 py-12 text-center border-t border-white/5 text-gray-500 text-sm">
                <p>Starting with a template is the fastest way to build your link-in-bio.</p>
            </footer>
        </div>
    );
}
