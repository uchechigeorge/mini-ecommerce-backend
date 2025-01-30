import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Allow only 5 requests per 5 minutes
  message: {
    status: 429,
    message: "Too many login attempts, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
});

export default authLimiter;
