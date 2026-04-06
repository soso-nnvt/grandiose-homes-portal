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

    // Mapping logic (Flat structure)
    const street = item.address_street || "Address not available";
    const city = item.address_three || "";
    const address = `${street} ${city}`.trim();
    const price = item.price_formatted || item.price_actual || "Price on Application";
    const bedrooms = parseInt(item.bedrooms) || 0;
    const bathrooms = parseInt(item.bathrooms) || 0;
    const image = item.images?.[0]?.url || "https://picsum.photos/seed/property/800/600";
    const gallery = item.images?.map((img: any) => img.url) || [image];
    const status = item.availability || "Available";

    // Map WordPress data
    const property = {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || "Untitled Property",
      content: item.description || item.content?.rendered || "",
      price,
      bedrooms,
      bathrooms,
      address,
      image,
      gallery,
      status,
      property_type: item.property_type,
      availability: item.availability,
      reception_rooms: item.reception_rooms,
      parking: item.parking,
      furnished: item.furnished,
      deposit: item.deposit,
      available_date: item.available_date,
      tenure: item.tenure,
      price_qualifier: item.price_qualifier,
      rent_frequency: item.rent_frequency,
      outside_space: item.outside_space,
      on_market: item.on_market,
      marketing_flag: item.marketing_flag,
      description: item.description || item.content?.rendered || "",
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
