import { formatDate } from "date-fns";
import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Get current date for folder and file naming
const now = new Date();
const logFolder = formatDate(now, "yyyy_MMM");

// File paths
const errorLogDir = path.join("public", "logs", "errors", logFolder);
const exceptionLogDir = path.join("public", "logs", "exceptions", logFolder);

const logger = createLogger({
  level: "info", // Default log level
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      ({ timestamp, level, message, stack }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}${
          stack ? `\n${stack}` : ""
        }`
    )
  ),
  transports: [
    // Console transport for general logging
    new transports.Console({
      level: "info", // Log all requests to console
    }),
    // File transport for errors
    new DailyRotateFile({
      level: "error", // Only log error-level messages to this file
      dirname: errorLogDir,
      filename: `%DATE%.log`,
      datePattern: "yyyyMMDD",
      zippedArchive: true, // Compress old logs
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: exceptionLogDir,
      filename: `%DATE%.log`,
      datePattern: "yyyyMMDD",
      zippedArchive: true, // Compress old logs
    }),
  ],
});

export default logger;
