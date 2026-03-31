import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const WP_BASE_URL = process.env.WP_BASE_URL || "https://demorealestate.iceiy.com/wp-json/wp/v2/";
const WP_AUTH_USERNAME = process.env.WP_AUTH_USERNAME;
const WP_AUTH_APP_PASSWORD = process.env.WP_AUTH_APP_PASSWORD;

/**
 * Encodes the WordPress Application Password into a Base64 Basic Auth string.
 */
const getAuthHeader = () => {
  if (!WP_AUTH_USERNAME || !WP_AUTH_APP_PASSWORD) {
    return null;
  }
  const token = Buffer.from(`${WP_AUTH_USERNAME}:${WP_AUTH_APP_PASSWORD}`).toString("base64");
  return `Basic ${token}`;
};

// API Bridge for Properties
app.get("/api/properties", async (req, res) => {
  try {
    const authHeader = getAuthHeader();
    const headers: any = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // Property Hive endpoint
    const response = await axios.get(`${WP_BASE_URL}property`, {
      params: {
        ...req.query,
        _embed: true, // Ensure images and terms are embedded
      },
      headers,
    });

    // Add CORS header explicitly as requested
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
  } catch (error: any) {
    console.error("WP API Error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || "Internal Server Error";
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(status).json({ 
      error: message, 
      details: error.response?.data,
      hint: status === 401 ? "Check WP_AUTH_USERNAME and WP_AUTH_APP_PASSWORD" : undefined
    });
  }
});

// API Bridge for Offices
app.get("/api/offices", async (req, res) => {
  try {
    const response = await axios.get(`${WP_BASE_URL}office`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(status).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
