-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sites table
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subdomain TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT 'My Site',
  description TEXT DEFAULT '',
  profile_image_url TEXT,
  links JSONB DEFAULT '[]'::jsonb,
  embeds JSONB DEFAULT '[]'::jsonb,
  background_color TEXT DEFAULT '#ffffff',
  background_image_url TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  custom_domain TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS sites_user_id_idx ON sites(user_id);
CREATE INDEX IF NOT EXISTS sites_subdomain_idx ON sites(subdomain);
CREATE INDEX IF NOT EXISTS sites_custom_domain_idx ON sites(custom_domain);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
-- Users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for sites table
-- Users can read their own sites
CREATE POLICY "Users can read own sites"
  ON sites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Public can read published sites
CREATE POLICY "Public can read published sites"
  ON sites
  FOR SELECT
  USING (is_published = TRUE);

-- Users can insert their own sites
CREATE POLICY "Users can insert own sites"
  ON sites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sites
CREATE POLICY "Users can update own sites"
  ON sites
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own sites
CREATE POLICY "Users can delete own sites"
  ON sites
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Storage policy: Public can read images
CREATE POLICY "Public can read images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'site-images');

-- Storage policy: Users can update their own images
CREATE POLICY "Users can update own images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images');

-- Storage policy: Users can delete their own images
CREATE POLICY "Users can delete own images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images');
