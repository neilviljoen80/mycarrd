# mycarrd.online

A modern link-in-bio website builder similar to Carrd.co, built with Next.js 15, TypeScript, Supabase, and Whop payments.

## Features

- 🔐 **Email Magic Link Authentication** via Supabase Auth
- 🎨 **Visual Builder** with drag-and-drop links, color picker, image uploads
- 🔗 **Custom Subdomains** (yourname.mycarrd.online)
- 🐦 **X/Twitter Thread Embeds** via oEmbed API
- 💎 **Pro Tier** - Unlimited sites, custom domains, no branding ($9/year via Whop)
- 📱 **Responsive Design** - Mobile-first UI with Tailwind CSS
- 🚀 **Vercel-Ready** - Optimized for edge deployment

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Whop Checkout
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- A Whop account (for Pro payments)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema from `supabase-schema.sql`
3. Enable **Email Auth** in Authentication settings
4. Create a **Storage bucket** named `site-images` (public)
5. Copy your project URL and anon key

### 3. Configure Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Whop
# Note: @whop/checkout package needs to be installed separately or integrated manually
# For now, the upgrade page has a placeholder for Whop integration
NEXT_PUBLIC_WHOP_PLAN_ID=your-plan-id
WHOP_API_KEY=your-api-key
WHOP_WEBHOOK_SECRET=your-webhook-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Local Testing with Subdomains

To test subdomain routing locally:

**Option 1: Edit hosts file**
```
127.0.0.1 testuser.localhost
```

Then visit `http://testuser.localhost:3000`

**Option 2: Use ngrok**
```bash
ngrok http 3000
```

## Database Schema

### Users Table
- `id` - UUID (foreign key to auth.users)
- `email` - User email
- `username` - Unique username
- `is_pro` - Boolean (Pro status)

### Sites Table
- `id` - UUID
- `user_id` - Foreign key to users
- `subdomain` - Unique subdomain
- `title` - Site title
- `description` - Site description
- `profile_image_url` - Profile image URL
- `links` - JSONB array of links
- `embeds` - JSONB array of X embeds
- `background_color` - Hex color
- `custom_domain` - Custom domain (Pro only)
- `is_published` - Published status

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Configure Wildcard Subdomain

1. In your Vercel project settings, add domain `mycarrd.online`
2. Add wildcard domain `*.mycarrd.online`
3. Update your DNS:
   - `A` record: `@` → Vercel IP
   - `CNAME` record: `*` → `cname.vercel-dns.com`

### Set Up Whop Webhook

1. In Whop dashboard, configure webhook URL: `https://mycarrd.online/api/whop-webhook`
2. Subscribe to events: `subscription.created`, `subscription.canceled`
3. Copy webhook secret to `.env`

## Project Structure

```
src/
├── app/
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # User dashboard
│   ├── builder/        # Site editor
│   ├── site/           # Public site rendering
│   ├── upgrade/        # Pro upgrade page
│   └── api/            # API routes (webhooks)
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── builder/        # Builder components
│   ├── dashboard/      # Dashboard components
│   └── site/           # Site renderer
├── lib/
│   ├── supabase/       # Supabase clients
│   ├── oembed.ts       # X embed fetcher
│   ├── subdomain.ts    # Subdomain utilities
│   └── whop.ts         # Whop webhook verification
└── types/
    └── database.ts     # TypeScript types
```

## Free vs Pro Tiers

| Feature | Free | Pro |
|---------|------|-----|
| Sites | 3 | Unlimited |
| Custom Subdomain | ✅ | ✅ |
| X/Twitter Embeds | ✅ | ✅ |
| Custom Domain | ❌ | ✅ |
| Remove Badge | ❌ | ✅ |
| **Price** | $0 | $9/year |

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
