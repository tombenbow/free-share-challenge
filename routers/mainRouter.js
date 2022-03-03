//Express
import { Router } from "express";
//Routers
import { claimFreeShareRouter } from "./claimFreeShareRouter";
//Errors
import { send405Error } from "../errors/index";

export const mainRouter = Router();

mainRouter.use("/claim-free-share", claimFreeShareRouter);
mainRouter.route("/").all(send405Error);