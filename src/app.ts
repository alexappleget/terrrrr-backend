import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import worldRoutes from "./routes/world.routes";
import eventRoutes from "./routes/event.routes";
import { FRONTEND_URL, PORT } from "./config";
import { seed } from "./seed";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL as string,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/world", worldRoutes);
app.use("/api/event", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
  seed();
});
