import { Handler } from "@netlify/functions";
import axios from "axios";
import { Buffer } from "buffer";

/**
 * Netlify Function to fetch a single property by ID from WordPress.
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

  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Property ID is required" }),
    };
  }

  const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
  const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;
  const WP_BASE_URL = process.env.WP_BASE_URL || "https://dev-grandiose-homes.pantheonsite.io/wp-json/wp/v2/";

  const getAuthHeader = () => {
    if (!WP_AUTH_USERNAME || !WP_AUTH_APP_PASSWORD) return null;
    const token = Buffer.from(`${WP_AUTH_USERNAME}:${WP_AUTH_APP_PASSWORD}`).toString("base64");
    return `Basic ${token}`;
  };

  try {
    const authHeader = getAuthHeader();
    const headers: any = { 
      "Content-Type": "application/json",
      "X-Pantheon-Staging": "1", // Bypass Pantheon Sandbox Environment Notice
    };
    if (authHeader) headers["Authorization"] = authHeader;

    // Fetch single property with _embed parameter
    const response = await axios.get(`${WP_BASE_URL}property/${id}`, {
      params: { _embed: true },
      headers,
      responseType: "json",
    });

    const item = response.data;

    // Warning if _embedded is missing
    if (!item._embedded) {
      console.warn(`Warning: _embedded field missing for property ${item.id}. Ensure ?_embed=true is used.`);
    }

    // Map WordPress data using Property Hive meta keys (_ph_)
    const property = {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || "Untitled Property",
      content: item.content?.rendered || "",
      price: item.meta?._ph_price_text || item.meta?.price || "Price on Application",
      bedrooms: parseInt(item.meta?._ph_bedrooms || item.meta?.bedrooms || "0"),
      bathrooms: parseInt(item.meta?._ph_bathrooms || item.meta?.bathrooms || "0"),
      address: item.meta?._ph_address_display || item.meta?.address_street || "Address not available",
      image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://picsum.photos/seed/property/800/600",
      gallery: item.meta?._ph_gallery || [],
      virtual_tour: item.meta?._ph_virtual_tour_url || item.meta?.virtual_tour || "",
      status: item.meta?._ph_status || (item.status === "publish" ? "Available" : item.status),
    };

    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
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
