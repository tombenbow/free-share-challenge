//Express
import express from "express";
//Routers
import { mainRouter } from "./routers/mainRouter.js";
//Errors
import { handleServerErrors, send405Error, sendCustomErrors } from "./errors/index.js";

export const app = express();

app.set("port", 3001);

app.use(express.json());
app.use("/api", mainRouter).all("/api", send405Error);
app.use(sendCustomErrors);
app.use(handleServerErrors);
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});