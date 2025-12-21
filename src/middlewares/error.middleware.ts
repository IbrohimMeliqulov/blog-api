import type { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError.js";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
      statusCode: 400,
    });
  }

  console.error("Error", err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    statusCode: 500,
  });
};
