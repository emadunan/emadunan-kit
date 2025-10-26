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
    if (!number) return false;

    // Remove spaces and non-digit symbols except leading +
    let cleaned = number.replace(/\s+/g, '').trim();

    // Normalize prefixes
    if (cleaned.startsWith('0020')) cleaned = cleaned.replace(/^0020/, '');
    else if (cleaned.startsWith('+20')) cleaned = cleaned.replace(/^\+20/, '');
    else if (cleaned.startsWith('20')) cleaned = cleaned.replace(/^20/, '');
    else if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);

    // Now we should have something like 10XXXXXXXXX
    const mobileRegex = /^(10|11|12|15)\d{8}$/;

    if (!mobileRegex.test(cleaned)) return false;

    // Return standardized E.164 format
    return `+20${cleaned}`;
  } catch {
    return false;
  }
}

