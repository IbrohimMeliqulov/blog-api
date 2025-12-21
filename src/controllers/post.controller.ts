import type { Request, Response, NextFunction } from "express";
import { Post } from "../entities/post.js";
import { BaseController } from "./base.controller.js";
import AppDataSource from "../config/database.js";
import { ApiError } from "../middlewares/ApiError.js";
import { PostService } from "../services/post.service.js";

const postRepository = AppDataSource.getRepository(Post);
const postService = new PostService(postRepository);

export class PostController extends BaseController<Post> {
  constructor() {
    super(postService);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postService.createPost(req.body);

      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = await postService.updatePost(id as string, req.body);

      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: post,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const postController = new PostController();
