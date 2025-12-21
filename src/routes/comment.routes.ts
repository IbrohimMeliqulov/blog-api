import { Router } from "express";
import { commentController } from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.get("/", commentController.findAll);
commentRouter.get("/search", commentController.search.bind(commentController));
commentRouter.get("/:id", commentController.findOne);
commentRouter.post("/", commentController.create);
commentRouter.put("/:id", commentController.update);
commentRouter.delete("/:id", commentController.delete);

export default commentRouter;
