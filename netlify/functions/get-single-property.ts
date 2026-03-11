import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
  const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;
  const WP_BASE_URL = process.env.WP_BASE_URL || 'https://demorealestate.iceiy.com/wp-json/wp/v2/';

  const auth = Buffer.from(`${WP_AUTH_USERNAME}:${WP_AUTH_APP_PASSWORD}`).toString('base64');
  const { id, slug } = event.queryStringParameters || {};

  try {
    let url = `${WP_BASE_URL}property`;
    if (id) {
      url += `/${id}?_embed`;
    } else if (slug) {
      url += `?slug=${slug}&_embed`;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing id or slug parameter' }),
      };
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch property from WordPress' }),
      };
    }

    const data = await response.json();
    const item = Array.isArray(data) ? data[0] : data;

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Property Not Found' }),
      };
    }

    // "Lite" Filter: Strip unnecessary metadata
    const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    const gallery = item._embedded?.['wp:featuredmedia']?.map((m: any) => m.source_url) || [featuredMedia];
    
    const property = {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered,
      content: item.content?.rendered,
      price: item.meta?._price || 'POA',
      bedrooms: item.meta?._bedrooms || 0,
      bathrooms: item.meta?._bathrooms || 0,
      address: item.meta?._address || item.title?.rendered,
      image: featuredMedia,
      gallery: gallery,
      virtual_tour: item.meta?._virtual_tour || '',
      status: item.meta?._status || 'Available',
    };

    return {
      statusCode: 200,
      body: JSON.stringify(property),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
