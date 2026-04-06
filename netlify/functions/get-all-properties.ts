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
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
    if (authHeader) headers["Authorization"] = authHeader;

    // Fetch properties with _embed parameter and pagination fix
    const response = await axios.get(`${WP_BASE_URL}property`, {
      params: { 
        _embed: true,
        per_page: 100
      },
      headers,
      // We remove responseType: "json" temporarily to handle potential HTML responses gracefully
    });

    // Diagnostic Logging
    console.log("Diagnostic - Status Code:", response.status);
    const rawData = typeof response.data === "string" ? response.data : JSON.stringify(response.data);
    console.log("Diagnostic - Raw Data (first 200 chars):", rawData.substring(0, 200));

    // Content-Type Validation
    const contentType = response.headers["content-type"] || "";
    if (contentType.includes("text/html")) {
      throw new Error("Bypass Failed: Pantheon served HTML interstitial.");
    }

    const data = response.data;

    // Mapping Safety
    const properties = data.map((item: any) => {
      try {
        // 1. Address Construction
        const address = [item.address_street, item.address_two, item.address_three, item.address_four, item.address_postcode]
          .filter(Boolean)
          .join(', ') || 'Address not available';

        // 2. Price Logic
        const price = item.price_formatted || item.price_actual || "Price on Application";

        // 3. Numeric Fields
        const bedrooms = parseInt(item.bedrooms) || 0;
        const bathrooms = parseInt(item.bathrooms) || 0;
        const reception_rooms = parseInt(item.reception_rooms) || 0;

        // 4. Image Handling
        const image = item.images?.[0]?.url || "https://picsum.photos/seed/property/800/600";

        // 5. Availability
        const status = item.availability || "Available";

        return {
          id: item.id,
          slug: item.slug,
          title: item.title?.rendered || "Untitled Property",
          content: item.content?.rendered || "",
          description: item.description || item.content?.rendered || "",
          price,
          price_actual: item.price_actual,
          price_formatted: item.price_formatted,
          price_qualifier: item.price_qualifier,
          currency: item.currency,
          rent_frequency: item.rent_frequency,
          deposit: item.deposit,
          council_tax_band: item.council_tax_band,
          bedrooms,
          bathrooms,
          reception_rooms,
          property_type: item.property_type,
          tenure: item.tenure,
          address,
          address_street: item.address_street,
          address_two: item.address_two,
          address_three: item.address_three,
          address_four: item.address_four,
          address_postcode: item.address_postcode,
          address_country: item.address_country,
          latitude: item.latitude,
          longitude: item.longitude,
          image,
          gallery: item.images?.map((img: any) => img.url) || [image],
          features: Array.isArray(item.features) ? item.features : [],
          parking: item.parking,
          outside_space: item.outside_space,
          furnished: item.furnished,
          availability: item.availability,
          status,
          on_market: item.on_market,
          available_date: item.available_date,
          sale_by: item.sale_by,
          marketing_flag: item.marketing_flag,
          reference_number: item.reference_number,
          negotiator: item.negotiator ? {
            name: item.negotiator.name,
            email: item.negotiator.email
          } : null,
        };
      } catch (mapError: any) {
        console.error(`Mapping failed for property ID: ${item?.id || "unknown"}. Error: ${mapError.message}`);
        return null; // Skip this property
      }
    }).filter((p: any) => p !== null); // Remove failed mappings

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
      body: JSON.stringify({ 
        error: message, 
        details: error.response?.data,
        diagnostics: {
          status: error.response?.status,
          message: error.message
        }
      }),
    };
  }
};
