import { Handler } from "@netlify/functions";
import axios from "axios";
import { Buffer } from "buffer";

/**
 * Netlify Function to submit an enquiry to WordPress.
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

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
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
    const headers: any = { "Content-Type": "application/json" };
    if (authHeader) headers["Authorization"] = authHeader;

    const body = JSON.parse(event.body || "{}");

    const response = await axios.post(`${WP_BASE_URL}enquiry`, body, {
      headers,
      responseType: "json",
    });

    return {
      statusCode: 201,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true, data: response.data }),
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
