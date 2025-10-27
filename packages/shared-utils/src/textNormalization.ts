export enum Lang {
  VOID = "",
  NATIVE = "na",
  ENGLISH = "en",
  ARABIC = "ar",
  HEBREW = "he",
  FRENCH = "fr",
  GERMAN = "de",
  SPANISH = "es",
  ITALIAN = "it",
  PORTUGUESE = "pt",
  RUSSIAN = "ru",
  CHINESE = "zh",
  JAPANESE = "ja",
  KOREAN = "ko",
  TURKISH = "tr",
  PERSIAN = "fa",
  URDU = "ur",
  HINDI = "hi",
  BENGALI = "bn",
  INDONESIAN = "id",
  MALAY = "ms",
  THAI = "th",
  DUTCH = "nl",
  SWEDISH = "sv",
  NORWEGIAN = "no",
  DANISH = "da",
  FINNISH = "fi",
  POLISH = "pl",
  CZECH = "cs",
  HUNGARIAN = "hu",
  ROMANIAN = "ro",
  GREEK = "el",
  UKRAINIAN = "uk",
  VIETNAMESE = "vi",
  SERBIAN = "sr",
  CROATIAN = "hr",
  BULGARIAN = "bg",
  SLOVAK = "sk",
  SLOVENE = "sl",
  LITHUANIAN = "lt",
  LATVIAN = "lv",
  ESTONIAN = "et",
  FILIPINO = "tl",
  SWAHILI = "sw",
}

export function detectLanguage(text: string): Lang {
  if (/[\u0600-\u06FF]/.test(text)) return Lang.ARABIC; // Arabic
  if (/[\u0590-\u05FF]/.test(text)) return Lang.HEBREW; // Hebrew
  if (/[\u0370-\u03FF]/.test(text)) return Lang.GREEK; // Greek
  if (/[\u0400-\u04FF]/.test(text)) return Lang.RUSSIAN; // Russian (Cyrillic)
  if (/[\u0041-\u005A\u0061-\u007A]/.test(text)) return Lang.ENGLISH; // English/French (Latin)

  return Lang.ENGLISH;
}

export function normalizeText(text: string, lang: Lang): string {
  if (!text) return '';

  switch (lang) {
    case Lang.ARABIC:
      return normalizeArText(removeArDiacritics(text)).normalize("NFC");

    case Lang.HEBREW:
      return removeHebrewDiacritics(text).normalize("NFC");

    case Lang.GREEK:
      return removeGreekDiacritics(text).normalize("NFC");

    case Lang.ENGLISH:
    case Lang.RUSSIAN:
    default:
      return text.trim().normalize("NFC");
  }
}

function removeHebrewDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/g, '');
}

function removeGreekDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function removeArDiacritics(text: string): string {
  return text.replace(/[\u064B-\u065F\u0670]/g, "");
}

function normalizeArText(text: string): string {
  if (!text) return "";

  const normalizationMap: Record<string, string> = {
    "آ": "ا", "أ": "ا", "إ": "ا", "ٱ": "ا", // Variants of Alef → Alef
    "ة": "ه", "ى": "ي", "ؤ": "و", "ئ": "ي", // Teh Marbuta, Alef Maksura, Waw & Yeh with Hamza → normalized
    "٠": "0", "١": "1", "٢": "2", "٣": "3", // Arabic digits → Western digits
    "٤": "4", "٥": "5", "٦": "6", "٧": "7",
    "٨": "8", "٩": "9"
  };

  return text.replace(/[آأإٱةىؤئ٠-٩]/g, (char) => normalizationMap[char]);
}

export function sanitizeWord(input: string): string {
  return input
    .trim()                               // Remove leading/trailing whitespace
    .replace(/["'“”‘’«»]/g, "")           // Remove all quotation marks including Arabic-style «»
    .replace(/[()[\]{}<>]/g, "")          // Remove all types of brackets
    .replace(/[^\p{L}\-–—\u05BE]/gu, "")  // Remove everything except Unicode letters and dashes
    .normalize("NFC");                    // Normalize composed characters
}