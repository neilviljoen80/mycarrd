import { createServiceClient } from "@/lib/supabase/server";
import { verifyWhopWebhook } from "@/lib/whop";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const signature = request.headers.get("x-whop-signature") || "";

        // Verify webhook signature
        const isValid = verifyWhopWebhook(
            body,
            signature,
            process.env.WHOP_WEBHOOK_SECRET!
        );

        if (!isValid) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const payload = JSON.parse(body);

        // Handle subscription created event
        if (payload.event === "subscription.created") {
            const userEmail = payload.data.user.email;

            if (!userEmail) {
                return NextResponse.json({ error: "No email provided" }, { status: 400 });
            }

            const supabase = await createServiceClient();

            // Find user by email and update to Pro
            const { error } = await (supabase
                .from("users") as any)
                .update({ is_pro: true })
                .eq("email", userEmail);

            if (error) {
                console.error("Error updating user:", error);
                return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
            }
        }

        // Handle subscription canceled event
        if (payload.event === "subscription.canceled") {
            const userEmail = payload.data.user.email;

            if (!userEmail) {
                return NextResponse.json({ error: "No email provided" }, { status: 400 });
            }

            const supabase = await createServiceClient();

            // Find user by email and downgrade from Pro
            const { error } = await (supabase
                .from("users") as any)
                .update({ is_pro: false })
                .eq("email", userEmail);

            if (error) {
                console.error("Error updating user:", error);
                return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
