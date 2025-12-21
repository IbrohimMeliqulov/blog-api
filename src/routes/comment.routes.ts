import { Router } from "express";
import { commentController } from "../controllers/comment.controller.js";
import { validateFunction } from "../middlewares/validate.middleware.js";
import {
  CommentSchema,
  CommentUpdateSchema,
} from "../validation/comment.validation.js";

const commentRouter = Router();

commentRouter.get("/", commentController.findAll);
commentRouter.get("/search", commentController.search.bind(commentController));
commentRouter.get("/:id", commentController.findOne);
commentRouter.post(
  "/",
  validateFunction(CommentSchema),
  commentController.create,
);
commentRouter.put(
  "/:id",
  validateFunction(CommentUpdateSchema),
  commentController.update,
);
commentRouter.delete("/:id", commentController.delete);

export default commentRouter;
