-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for membership form submissions
CREATE TABLE public.membership_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  membership_type TEXT NOT NULL CHECK (membership_type IN ('individual', 'household')),
  household_notes TEXT,
  acknowledged BOOLEAN NOT NULL DEFAULT false,
  payment_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for donation form submissions
CREATE TABLE public.donation_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  donation_amount DECIMAL(10,2) NOT NULL,
  intended_payment_date DATE,
  message TEXT,
  acknowledged BOOLEAN NOT NULL DEFAULT false,
  payment_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous inserts (public forms)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit membership form"
  ON public.membership_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit donation form"
  ON public.donation_submissions
  FOR INSERT
  WITH CHECK (true);

-- Note: Read/Update/Delete policies are intentionally NOT created
-- Only admins with direct database access can view submissions