import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ExternalLink, Edit, Trash2, Rocket } from "lucide-react";
import { createSite, deleteSite, logout } from "./actions";
import { DeleteSiteButton } from "@/components/dashboard/DeleteSiteButton";
import { CreateSiteButton } from "@/components/dashboard/CreateSiteButton";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Get user data
    const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    const isPro = userData ? (userData as any).is_pro : false;
    const userEmail = userData ? (userData as any).email : user.email;

    // Get user's sites
    const { data: sites } = await (supabase
        .from("sites") as any)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    const siteCount = sites?.length || 0;
    const canCreateMore = isPro || siteCount < 3;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">My Sites</h1>
                        <p className="text-sm text-muted-foreground">
                            {userEmail} {isPro && "• Pro"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {!isPro && (
                            <Button asChild variant="outline">
                                <Link href="/upgrade">Upgrade to Pro</Link>
                            </Button>
                        )}
                        <form action={logout}>
                            <Button type="submit" variant="ghost">Logout</Button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Create New Site Card */}
                <div className="mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Site</CardTitle>
                            <CardDescription>
                                {isPro
                                    ? "You have unlimited sites on Pro"
                                    : `${siteCount} of 3 sites used on Free tier`
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {canCreateMore ? (
                                <div className="flex flex-wrap gap-4">
                                    <CreateSiteButton />
                                    <Button asChild variant="outline">
                                        <Link href="/templates">
                                            <Rocket className="h-4 w-4 mr-2" />
                                            Start with Template
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        You've reached the free tier limit. Upgrade to Pro for unlimited sites.
                                    </p>
                                    <Button asChild>
                                        <Link href="/upgrade">Upgrade to Pro</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sites Grid */}
                {sites && (sites as any[]).length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(sites as any[]).map((site: any) => (
                            <Card key={site.id}>
                                <CardHeader>
                                    <CardTitle className="truncate">{site.title}</CardTitle>
                                    <CardDescription className="truncate">
                                        {site.subdomain}.mycarrd.online
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex gap-2">
                                        <Button asChild size="sm" className="flex-1">
                                            <Link href={`/builder/${site.id}`}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button asChild size="sm" variant="outline">
                                            <a
                                                href={`https://${site.subdomain}.mycarrd.online`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                    <DeleteSiteButton siteId={site.id} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground mb-4">
                                You haven't created any sites yet
                            </p>
                            <CreateSiteButton />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
