/**
 * Maps WordPress Property Hive API response to the application's Property interface.
 */
export function mapWPProperty(wpProperty: any) {
  const { id, slug, title, content, _embedded, virtual_tour } = wpProperty;

  // Property Hive fields can be top-level or in meta depending on REST API configuration
  const meta = wpProperty.meta || {};
  const price = wpProperty.price || meta.price || 'Price on Application';
  const bedrooms = wpProperty.bedrooms || meta.bedrooms || 0;
  const bathrooms = wpProperty.bathrooms || meta.bathrooms || 0;
  const address_street = wpProperty.address_street || meta.address_street || '';
  const address_postcode = wpProperty.address_postcode || meta.address_postcode || '';

  // Extract featured image from embedded data
  const featuredMedia = _embedded?.['wp:featuredmedia']?.[0];
  const image = featuredMedia?.source_url || 'https://picsum.photos/seed/property/800/600';

  // Extract gallery images if available
  const gallery = [image];

  return {
    id,
    slug,
    title: title?.rendered || 'Untitled Property',
    content: content?.rendered || '',
    price,
    bedrooms: parseInt(bedrooms) || 0,
    bathrooms: parseInt(bathrooms) || 0,
    address: `${address_street} ${address_postcode}`.trim() || 'Address not available',
    image,
    gallery,
    virtual_tour: virtual_tour || meta.virtual_tour || '',
    status: wpProperty.status === 'publish' ? 'Available' : wpProperty.status,
  };
}
