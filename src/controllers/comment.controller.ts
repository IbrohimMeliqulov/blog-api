import type { Request, Response, NextFunction } from "express";
import { Comment } from "../entities/comment.js";
import { BaseController } from "./base.controller.js";
import AppDataSource from "../config/database.js";
import { ApiError } from "../middlewares/ApiError.js";
import { CommentService } from "../services/comment.service.js";
import { User } from "../entities/user.js";
import { Post } from "../entities/post.js";

const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);
const commentService = new CommentService(
  commentRepository,
  userRepository,
  postRepository,
);

export class CommentController extends BaseController<Comment> {
  constructor() {
    super(commentService);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await commentService.createComment(req.body);

      return res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: comment,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const comment = await commentService.updateComment(
        id as string,
        req.body,
      );

      return res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        data: comment,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const commentController = new CommentController();
