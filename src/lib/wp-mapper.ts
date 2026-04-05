/**
 * Maps WordPress Property Hive API response to the application's Property interface.
 * This version handles the flat JSON structure where custom fields are at the root.
 */
export function mapWPProperty(wpProperty: any) {
  const { 
    id, 
    slug, 
    title, 
    content, 
    price_formatted, 
    price_actual, 
    bedrooms, 
    bathrooms, 
    address_street, 
    address_three, 
    availability, 
    images 
  } = wpProperty;

  // 1. Address Construction
  const street = address_street || 'Address not available';
  const city = address_three || '';
  const address = `${street} ${city}`.trim();

  // 2. Price Logic
  const price = price_formatted || price_actual || 'Price on Application';

  // 3. Image Handling
  const image = images?.[0]?.url || 'https://picsum.photos/seed/property/800/600';
  const gallery = images?.map((img: any) => img.url) || [image];

  return {
    id,
    slug,
    title: title?.rendered || 'Untitled Property',
    content: content?.rendered || '',
    price,
    bedrooms: parseInt(bedrooms) || 0,
    bathrooms: parseInt(bathrooms) || 0,
    address,
    image,
    gallery,
    status: availability || 'Available',
  };
}
