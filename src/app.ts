import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import expressWinston from "express-winston";
import apiRoutes from "@routes/index";
import envOptions from "@config/env.config";
import logger from "@config/logger.config";

dotenv.config({ path: envOptions.path });

const upload = multer();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: "*",
  })
);

// Enable json body
app.use(express.json());
// Enable urlencoded body
app.use(express.urlencoded({ extended: true }));
// Enable form-data body
app.use(upload.any());

// Handle static files
app.use("/assets", express.static("public/assets"));
app.use("/files", express.static("public/files"));
app.use("/logs", express.static("public/logs"));

// Middleware to log all HTTP requests
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true, // Use morgan-like logging format
    colorize: true,
  })
);

// Handle routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  const response = {
    status: true,
    message: "You probably shouldn't be here, but...",
    data: {
      service: "e-commerce-api",
      version: "1.0.0",
    },
  };

  res.send(`<pre>${JSON.stringify(response, null, 4)}</pre>`);
});

export default app;
