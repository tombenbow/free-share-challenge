//Express
import { Router } from "express";
//Controllers
import { claimFreeShareController } from "../controllers/claimFreeShareControllers.js";
//Errors
import { send405Error } from "../errors/index.js";

export const claimFreeShareRouter = Router();

claimFreeShareRouter.route("/").post(claimFreeShareController).all(send405Error);