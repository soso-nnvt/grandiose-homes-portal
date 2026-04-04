import { Handler } from "@netlify/functions";
import axios from "axios";
import { Buffer } from "buffer";

/**
 * Netlify Function to fetch and map all properties from WordPress.
 * Standardizes CORS headers and handles preflight requests.
 */

export const handler: Handler = async (event) => {
  const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
  const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;
  const WP_BASE_URL = process.env.WP_BASE_URL || "https://demorealestate.iceiy.com/wp-json/wp/v2/";

  const getAuthHeader = () => {
    if (!WP_AUTH_USERNAME || !WP_AUTH_APP_PASSWORD) return null;
    const token = Buffer.from(`${WP_AUTH_USERNAME}:${WP_AUTH_APP_PASSWORD}`).toString("base64");
    return `Basic ${token}`;
  };

  try {
    const authHeader = getAuthHeader();
    const headers: any = { 
      "Content-Type": "application/json",
      "Cookie": "__test=565ab1bfb1b388eda096b7a3120ea422",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    };
    if (authHeader) headers["Authorization"] = authHeader;

    // Fetch properties with _embed parameter
    const response = await axios.get(`${WP_BASE_URL}property`, {
      params: { _embed: true },
      headers,
      // We use 'text' or default to see the raw response if it's HTML
      // but the user wants to see if it's still returning the JS challenge.
      // If it's JSON, axios will parse it. If it's HTML, we'll see it.
    });

    // Log the first 200 characters of the raw response data
    const rawData = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    console.log("RAW BODY (first 200 chars):", rawData.substring(0, 200));

    const data = response.data;

    // If data is a string, it might be the HTML challenge
    if (typeof data === 'string' && data.includes('<!doctype html')) {
      throw new Error("Received HTML instead of JSON. Security challenge likely failed.");
    }

    // Map WordPress data using Property Hive meta keys (_ph_)
    const properties = data.map((item: any) => {
      // Warning if _embedded is missing
      if (!item._embedded) {
        console.warn(`Warning: _embedded field missing for property ${item.id}. Ensure ?_embed=true is used.`);
      }

      return {
        id: item.id,
        slug: item.slug,
        title: item.title?.rendered || "Untitled Property",
        // Using _ph_ meta keys as per Property Hive schema
        price: item.meta?._ph_price_text || item.meta?.price || "Price on Application",
        bedrooms: parseInt(item.meta?._ph_bedrooms || item.meta?.bedrooms || "0"),
        address: item.meta?._ph_address_display || item.meta?.address_street || "Address not available",
        image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://picsum.photos/seed/property/800/600",
        status: item.meta?._ph_status || (item.status === "publish" ? "Available" : item.status),
      };
    });

    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(properties),
    };
  } catch (error: any) {
    console.error("Netlify Function Error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || "Internal Server Error";

    return {
      statusCode: status,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: message, details: error.response?.data }),
    };
  }
};
