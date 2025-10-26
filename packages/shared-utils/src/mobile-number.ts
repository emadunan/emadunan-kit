import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function isValidMobile(number: string) {
  try {
    const phoneNumber = parsePhoneNumberFromString(number);
    return phoneNumber?.isValid() ?? false;
  } catch {
    return false;
  }
}

export function formatEgyptianMobile(number: string): string | false {
  try {
    // Normalize any extra spaces or symbols
    const cleaned = number.trim();

    // Always parse assuming Egypt as default country
    const phoneNumber = parsePhoneNumberFromString(cleaned, 'EG');

    // Check validity and that it's a mobile type (starts with '1' after country code)
    if (phoneNumber?.isValid() && phoneNumber.country === 'EG' && phoneNumber.number.startsWith('+201')) {
      return phoneNumber.number; // returns standardized format like "+201003379933"
    }

    return false;
  } catch {
    return false;
  }
}
