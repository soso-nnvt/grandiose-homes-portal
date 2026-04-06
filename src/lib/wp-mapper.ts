/**
 * Maps WordPress Property Hive API response to the application's Property interface.
 * This version handles the flat JSON structure where custom fields are at the root.
 */
export function mapWPProperty(item: any) {
  if (!item) return null;

  // If the item is already mapped (from our Netlify bridge)
  if (typeof item.title === 'string') {
    return {
      ...item,
      // Ensure defaults for critical fields if they are missing
      price: item.price || 'Price on Application',
      address: item.address || 'Address not available',
      bedrooms: item.bedrooms || 0,
      bathrooms: item.bathrooms || 0,
      image: item.image || 'https://picsum.photos/seed/property/800/600',
      gallery: item.gallery || [item.image],
      status: item.status || 'Available',
    };
  }

  // Fallback for raw WordPress data
  const street = item.address_street || '';
  const city = item.address_three || '';
  const address = [item.address_street, item.address_two, item.address_three, item.address_four, item.address_postcode]
    .filter(Boolean)
    .join(', ') || 'Address not available';

  const price = item.price_formatted || item.price_actual || 'Price on Application';
  const image = item.images?.[0]?.url || 'https://picsum.photos/seed/property/800/600';

  return {
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || 'Untitled Property',
    content: item.content?.rendered || '',
    description: item.description || item.content?.rendered || '',
    price,
    price_actual: item.price_actual,
    price_formatted: item.price_formatted,
    price_qualifier: item.price_qualifier,
    currency: item.currency,
    rent_frequency: item.rent_frequency,
    deposit: item.deposit,
    council_tax_band: item.council_tax_band,
    bedrooms: parseInt(item.bedrooms) || 0,
    bathrooms: parseInt(item.bathrooms) || 0,
    reception_rooms: parseInt(item.reception_rooms) || 0,
    property_type: item.property_type,
    tenure: item.tenure,
    address,
    address_street: item.address_street,
    address_two: item.address_two,
    address_three: item.address_three,
    address_four: item.address_four,
    address_postcode: item.address_postcode,
    address_country: item.address_country,
    latitude: item.latitude,
    longitude: item.longitude,
    image,
    gallery: item.images?.map((img: any) => img.url) || [image],
    features: Array.isArray(item.features) ? item.features : [],
    parking: item.parking,
    outside_space: item.outside_space,
    furnished: item.furnished,
    availability: item.availability,
    status: item.availability || 'Available',
    on_market: item.on_market,
    available_date: item.available_date,
    sale_by: item.sale_by,
    marketing_flag: item.marketing_flag,
    reference_number: item.reference_number,
    negotiator: item.negotiator ? {
      name: item.negotiator.name,
      email: item.negotiator.email
    } : null,
  };
}
