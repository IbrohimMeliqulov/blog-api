import { Router } from "express";
import { postController } from "../controllers/post.controller.js";
import { validateFunction } from "../middlewares/validate.middleware.js";
import { PostSchema, PostUpdateSchema } from "../validation/post.validation.js";

const postRouter = Router();
postRouter.get("/", postController.findAll);
postRouter.get("/search", postController.search.bind(postController));
postRouter.get("/:id", postController.findOne);
postRouter.post("/", validateFunction(PostSchema), postController.create);
postRouter.put(
  "/:id",
  validateFunction(PostUpdateSchema),
  postController.update,
);
postRouter.delete("/:id", postController.delete);

export default postRouter;
