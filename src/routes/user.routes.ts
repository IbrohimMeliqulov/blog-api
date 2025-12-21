import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.get("/", UserController);
userRouter.post("/", UserController.create);
userRouter.get("/:id", UserController.findOne);
userRouter.put("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);

export default userRouter;
