//Express
import { Router } from "express";
//Controllers
import { claimFreeShareController } from "../controllers/claimFreeShareControllers";
//Errors
import { send405Error } from "../errors/index";

export const claimFreeShareRouter = Router();

claimFreeShareRouter.route("/").post(claimFreeShareController).all(send405Error);