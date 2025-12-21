import type { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.js";
import { BaseController } from "./base.controller.js";
import AppDataSource from "../config/database.js";
import { ApiError } from "../middlewares/ApiError.js";
import { UserService } from "../services/user.service.js";

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);

export class UserController extends BaseController<User> {
  constructor() {
    super(userService);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id as string, req.body);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async findByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const user = await userService.findByEmail(email as string);
      if (!user) {
        throw ApiError.notFound("User not found");
      }

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
