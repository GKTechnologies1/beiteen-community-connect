-- Add phone column to contact_submissions table
ALTER TABLE public.contact_submissions
ADD COLUMN phone text;