import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 200, 
      body: JSON.stringify({ error: true, message: 'Method Not Allowed' }) 
    };
  }

  const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
  const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;
  const WP_BASE_URL = process.env.WP_BASE_URL || 'https://demorealestate.iceiy.com/wp-json/wp/v2/';

  const auth = 'Basic ' + Buffer.from(WP_AUTH_USERNAME + ':' + WP_AUTH_APP_PASSWORD).toString('base64');

  try {
    const body = JSON.parse(event.body || '{}');

    const response = await fetch(`${WP_BASE_URL}enquiry`, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify({ error: true, message: 'Failed to submit enquiry', details: errorData }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error: any) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: true, message: error.message }),
    };
  }
};
