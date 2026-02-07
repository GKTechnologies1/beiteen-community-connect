-- Add phone column to donation_submissions
ALTER TABLE public.donation_submissions 
ADD COLUMN IF NOT EXISTS phone TEXT;