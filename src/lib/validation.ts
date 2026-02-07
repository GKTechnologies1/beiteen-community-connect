// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// US Phone validation (accepts various formats)
export const isValidUSPhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");
  // Should be 10 digits, or 11 if starting with 1
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
};

// Zelle contact validation (email OR phone)
export const isValidZelleContact = (contact: string): boolean => {
  return isValidEmail(contact) || isValidUSPhone(contact);
};

// ZIP code validation (5 digits, optionally ZIP+4)
export const isValidZipCode = (zip: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip.trim());
};

// Format phone for display
export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
};

// Format phone for E.164 storage (+13145551234)
export const formatPhoneForStorage = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return phone;
};
