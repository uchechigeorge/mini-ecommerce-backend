import logger from "@config/logger.config";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof z.ZodError) {
    res
      .status(400)
      .json({ status: 400, message: "Bad request", errors: err.errors });
    return;
  }

  logger.error(err.message, { stack: err.stack }); // Log the error stack for debugging
  res
    .status(500)
    .json({ status: 500, message: "An internal server error occurred" });
};

export default errorHandler;
