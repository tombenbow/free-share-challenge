//Helpers
import * as yup from "yup";

export const validateRequestBody = async (paramsObject) => {
  let schema = yup.object().shape({
    userId: yup.string().required(),
  });

  return await schema.isValid(paramsObject);
};
