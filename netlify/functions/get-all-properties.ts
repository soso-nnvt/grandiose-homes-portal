import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
  const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;
  const WP_BASE_URL = process.env.WP_BASE_URL || 'https://demorealestate.iceiy.com/wp-json/wp/v2/';

  const auth = Buffer.from(`${WP_AUTH_USERNAME}:${WP_AUTH_APP_PASSWORD}`).toString('base64');

  try {
    const response = await fetch(`${WP_BASE_URL}property?_embed`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch properties from WordPress' }),
      };
    }

    const data = await response.json();

    // "Lite" Filter: Strip unnecessary metadata
    const properties = data.map((item: any) => {
      // Extracting PropertyHive fields from meta or standard fields
      // Note: PropertyHive usually stores data in meta fields. 
      // We assume they are exposed in the REST API.
      const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
      
      return {
        id: item.id,
        slug: item.slug,
        title: item.title?.rendered,
        price: item.meta?._price || 'POA',
        bedrooms: item.meta?._bedrooms || 0,
        address: item.meta?._address || item.title?.rendered,
        image: featuredMedia,
        status: item.meta?._status || 'Available',
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(properties),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
