import { Router } from "express";
import { postController } from "../controllers/post.controller.js";

const postRouter = Router();
postRouter.get("/", postController.findAll);
postRouter.get("/search", postController.search);
postRouter.get("/:id", postController.findOne);
postRouter.post("/", postController.create);
postRouter.put("/:id", postController.update);
postRouter.delete("/:id", postController.delete);

export default postRouter;
