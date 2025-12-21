import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ApiError } from "./ApiError.js";

export const validateFunction = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      const errors = parseResult.error.format();
      return next(
        ApiError.badRequest("Validation failed:" + JSON.stringify(errors)),
      );
    }

    req.body = parseResult.data;

    next();
  };
};
