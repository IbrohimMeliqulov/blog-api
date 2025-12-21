import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.get("/", userController.findAll);
userRouter.get("/search", userController.search);
userRouter.get("/:id", userController.findOne);
userRouter.get("/find-by-email", userController.findByEmail);
userRouter.post("/", userController.create);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;
