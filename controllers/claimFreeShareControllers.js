//Models
import { claimFreeShareModel } from "../models/claimFreeShareModel";
//Helpers
import { validateRequestBody } from "./validation";


export const claimFreeShareController = async (
  req,
  res,
  next,
) => {
  try {
    const params = req.body;
    const validParams = await validateRequestBody(params);

    if (!validParams) throw new Error("Invalid Parameters");

    const dataObject = claimFreeShareModel(params);

    res.status(200).send(dataObject);
  } catch (err) {
    next(err);
  }
};