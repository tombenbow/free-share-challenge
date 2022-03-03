//Express
import { Router } from "express";
//Routers
import { claimFreeShareRouter } from "./claimFreeShareRouter.js";
//Errors
import { send405Error } from "../errors/index.js";

export const mainRouter = Router();

mainRouter.use("/claim-free-share", claimFreeShareRouter);
mainRouter.route("/").all(send405Error);