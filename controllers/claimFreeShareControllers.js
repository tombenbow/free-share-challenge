//Models
import { claimFreeShareModel } from "../models/claimFreeShareModel.js";
//Helpers
import { validateRequestBody } from "./validation.js";


export const claimFreeShareController = async (
  req,
  res,
  next,
) => {
  try {
    const { body } = req;
    const validBody = await validateRequestBody(body);

    if (!validBody) throw new Error("Invalid Parameters");

    claimFreeShareModel(body);

    res.status(200).send('[RequestSuccessful] share transferred to user.');
  } catch (err) {
    next(err);
  }
};