import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { seed } from "./seeds/seed";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "",
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 6842;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
  seed();
});
