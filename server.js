import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authentication from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/auth", authentication);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
