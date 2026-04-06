/**
 * Formats a property price using Intl.NumberFormat.
 * @param price_actual The raw price number.
 * @param currency The ISO currency code (e.g., 'GBP').
 * @param rent_frequency Optional rent frequency (e.g., 'pcm', 'pw').
 * @returns A localized currency string.
 */
export function formatPropertyPrice(
  price_actual: number | string | undefined,
  currency: string = 'GBP',
  rent_frequency?: string
): string {
  if (!price_actual || isNaN(Number(price_actual))) {
    return 'Price on Application';
  }

  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency || 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price_actual));

  if (rent_frequency) {
    return `${formatted} ${rent_frequency}`;
  }

  return formatted;
}

/**
 * Cleans HTML entities from a string.
 * @param str The string to clean.
 * @returns The cleaned string.
 */
export function cleanHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&pound;/g, '£')
    .replace(/&euro;/g, '€')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
