import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function isValidMobile(number: string) {
  try {
    const phoneNumber = parsePhoneNumberFromString(number);
    return phoneNumber?.isValid() ?? false;
  } catch {
    return false;
  }
}
