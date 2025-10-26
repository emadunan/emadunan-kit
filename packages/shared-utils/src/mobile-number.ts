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
    const cleaned = number.trim();
    const phoneNumber = parsePhoneNumberFromString(cleaned, 'EG');

    if (!phoneNumber?.isValid() || phoneNumber.country !== 'EG') return false;

    // Enforce Egyptian mobile pattern (starts with 010, 011, 012, 015 + 8 digits)
    const local = phoneNumber.nationalNumber; // e.g., "1003379933"
    const mobileRegex = /^(10|11|12|15)\d{8}$/;

    if (!mobileRegex.test(local)) return false;

    return phoneNumber.number; // standardized format like "+201003379933"
  } catch {
    return false;
  }
}
