export const sendCustomErrors = (err, req, res, next) => {
  if (err.message === "Invalid Parameters")
    res.status(400).send({ msg: "Bad Request" });
  else if (err.status) {
    res.status(err.status).send(err);
  } else next(err);
};

export const handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

export const send405Error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
