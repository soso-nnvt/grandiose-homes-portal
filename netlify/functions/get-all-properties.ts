import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

export const handler: Handler = async (event) => {
  const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
  const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;
  const WP_BASE_URL = process.env.WP_BASE_URL || 'https://demorealestate.iceiy.com/wp-json/wp/v2/';

  const auth = 'Basic ' + Buffer.from(WP_AUTH_USERNAME + ':' + WP_AUTH_APP_PASSWORD).toString('base64');

  try {
    const response = await fetch(`${WP_BASE_URL}property?_embed`, {
      headers: {
        'Authorization': auth,
      },
    });

    if (!response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ error: true, message: `Backend returned ${response.status}` }),
      };
    }

    const data: any = await response.json();

    const properties = data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      price: item.meta?._ph_price_text || 'Price on Application',
      bedrooms: item.meta?._ph_bedrooms || 0,
      address: item.meta?._ph_address_display || 'Lagos, Nigeria',
      image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      status: item.meta?._ph_status || 'Available',
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(properties),
    };
  } catch (error: any) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: true, message: error.message }),
    };
  }
};
