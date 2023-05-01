import { config } from "dotenv";
import express from "express";
import { stackVar } from "./Utils/errorHandling.js";
import connectionDB from "./Db/connection.js";
import * as allRouter from "./Modules/index.routes.js";
const port = 5000;
const app = express();
config({ path: "./Db/.env" });
app.use(express.json());
connectionDB();

app.use("/user", allRouter.userRouter);
app.use("/note", allRouter.noteRouter);

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err["cause"] || 500)
      .json({ message: "catch erroe",
              error: err.message, 
              stack: err.stack,
              stackVar: stackVar
             });
  }
});

app.listen(port, () => {
  console.log("server is running.................");
});
