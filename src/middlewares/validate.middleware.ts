import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ApiError } from "./ApiError.js";

export const validateFunction = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    req.body = parseResult.data;

    next();
  };
};
