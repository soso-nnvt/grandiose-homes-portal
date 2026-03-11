import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Incoming request:`, JSON.stringify(event.queryStringParameters));

  const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
  const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;
  const WP_BASE_URL = process.env.WP_BASE_URL || 'https://demorealestate.iceiy.com/wp-json/wp/v2/';

  console.log(`[${timestamp}] Auth State: WP_AUTH_USERNAME is ${WP_AUTH_USERNAME ? 'defined' : 'undefined'}, WP_AUTH_APP_PASSWORD is ${WP_AUTH_APP_PASSWORD ? 'defined' : 'undefined'}`);

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

    const auth = Buffer.from(`${WP_AUTH_USERNAME}:${WP_AUTH_APP_PASSWORD}`).toString('base64');
    
    const fetchStart = Date.now();
    console.log(`[${new Date().toISOString()}] Calling WordPress API: ${url}`);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    const fetchEnd = Date.now();
    const contentType = response.headers.get('content-type');
    console.log(`[${new Date().toISOString()}] WordPress Response: status=${response.status}, content-type=${contentType}, duration=${fetchEnd - fetchStart}ms`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${new Date().toISOString()}] WordPress Error Body:`, errorText.substring(0, 500));
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Failed to fetch property from WordPress',
          status: response.status,
          contentType: contentType,
          details: errorText.startsWith('<!doctype html>') ? 'Received HTML instead of JSON. Possible security block or 404.' : errorText
        }),
      };
    }

    // Check if content type is JSON before parsing
    if (!contentType || !contentType.includes('application/json')) {
      const rawBody = await response.text();
      console.error(`[${new Date().toISOString()}] Expected JSON but received:`, contentType);
      console.error(`[${new Date().toISOString()}] Raw Body Preview:`, rawBody.substring(0, 500));
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Invalid response format from WordPress',
          receivedContentType: contentType,
          bodyPreview: rawBody.substring(0, 200)
        }),
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    };
  } catch (error: any) {
    const errorTimestamp = new Date().toISOString();
    console.error(`[${errorTimestamp}] Function Execution Error:`, error.message);
    console.error(`[${errorTimestamp}] Stack Trace:`, error.stack);
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        timestamp: errorTimestamp
      }),
    };
  }
};
