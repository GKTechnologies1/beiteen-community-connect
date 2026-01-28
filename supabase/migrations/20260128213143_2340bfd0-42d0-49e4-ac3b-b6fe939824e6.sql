-- Add extended membership fields to the membership_submissions table
ALTER TABLE public.membership_submissions 
ADD COLUMN IF NOT EXISTS family_name TEXT,
ADD COLUMN IF NOT EXISTS head_first_name TEXT,
ADD COLUMN IF NOT EXISTS head_middle_name TEXT,
ADD COLUMN IF NOT EXISTS head_dob DATE,
ADD COLUMN IF NOT EXISTS street_address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS zip_code TEXT,
ADD COLUMN IF NOT EXISTS household_members TEXT,
ADD COLUMN IF NOT EXISTS college_id_urls TEXT[],
ADD COLUMN IF NOT EXISTS zelle_contact TEXT;

-- Create storage bucket for college ID uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('membership-documents', 'membership-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public uploads to membership-documents bucket
CREATE POLICY "Anyone can upload membership documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'membership-documents');

-- Create policy for public to read their own uploads (by path pattern)
CREATE POLICY "Public can read membership documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'membership-documents');