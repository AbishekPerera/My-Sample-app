import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(bodyparser.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 8075;
const URL = process.env.DB_URL;

// create db connection
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log("Server started successfully on PORT :" + PORT)
    )
  )
  .catch((e) => console.log(e.message));

//routes
app.use("/api/users", userRoutes);
