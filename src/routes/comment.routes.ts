import { Router } from "express";
import { commentController } from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.get("/", commentController.findAll);
commentRouter.get("/:id", commentController.findOne);
commentRouter.get("/search", commentController.search);
commentRouter.post("/", commentController.create);
commentRouter.put("/:id", commentController.update);
commentRouter.delete("/:id", commentController.delete);

export default commentRouter;
