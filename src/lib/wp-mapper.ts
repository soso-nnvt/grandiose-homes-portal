/**
 * Maps WordPress Property Hive API response to the application's Property interface.
 * This version handles the flat JSON structure where custom fields are at the root.
 */
export function mapWPProperty(item: any) {
  if (!item) return null;

  // If the item is already mapped (from our Netlify bridge)
  if (typeof item.title === 'string') {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      price: item.price || 'Price on Application',
      address: item.address || 'Address not available',
      bedrooms: item.bedrooms || 0,
      bathrooms: item.bathrooms || 0,
      image: item.image || 'https://picsum.photos/seed/property/800/600',
      gallery: item.gallery || [item.image],
      status: item.status || 'Available',
      content: item.content || '',
      property_type: item.property_type,
      availability: item.availability,
      reception_rooms: item.reception_rooms,
      parking: item.parking,
      furnished: item.furnished,
      deposit: item.deposit,
      available_date: item.available_date,
      tenure: item.tenure,
    };
  }

  // Fallback for raw WordPress data (if needed)
  const street = item.address_street || 'Address not available';
  const city = item.address_three || '';
  const address = `${street} ${city}`.trim();
  const price = item.price_formatted || item.price_actual || 'Price on Application';
  const image = item.images?.[0]?.url || 'https://picsum.photos/seed/property/800/600';

  return {
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || 'Untitled Property',
    content: item.content?.rendered || '',
    price,
    bedrooms: parseInt(item.bedrooms) || 0,
    bathrooms: parseInt(item.bathrooms) || 0,
    address,
    image,
    gallery: item.images?.map((img: any) => img.url) || [image],
    status: item.availability || 'Available',
    property_type: item.property_type,
    availability: item.availability,
    reception_rooms: item.reception_rooms,
    parking: item.parking,
    furnished: item.furnished,
    deposit: item.deposit,
    available_date: item.available_date,
    tenure: item.tenure,
  };
}
