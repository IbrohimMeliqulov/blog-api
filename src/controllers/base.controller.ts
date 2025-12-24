import type { Request, Response, NextFunction } from "express";
import { BaseService } from "../services/base.service.js";
import { ApiError } from "../middlewares/ApiError.js";
import { formatTashkent } from "../utils/dateformatter.js";

export class BaseController<T extends { id: string }> {
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.service.findAllPaginated(page, limit);

      const data = result.data.map((item: any) => ({
        ...item,
        created_at: formatTashkent(item.created_at),
        updated_at: formatTashkent(item.updated_at),
      }));

      return res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        data,
        pagination: result.pagination,
      });
    } catch (err) {
      next(err);
    }
  };

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const keyword = req.query.keyword as string;

      if (!keyword) {
        throw ApiError.badRequest("Keyword is required");
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.service.searchPaginated(keyword, page, limit);

      return res.status(200).json({
        success: true,
        message: "Search results retrieved successfully",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (err) {
      next(err);
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this.service.findOne(id as string);

      return res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.delete(id as string);

      return res.status(200).json({
        success: true,
        message: "Data deleted successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };
}
