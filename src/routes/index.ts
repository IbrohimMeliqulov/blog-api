import { Router } from "express";
import userRouter from "./user.routes.js";
import postRouter from "./post.routes.js";
import commentRouter from "./comment.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

export default router;