import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.routes";
import bossRoutes from "./routes/boss.routes";
import userRoutes from "./routes/user.routes";
import worldRoutes from "./routes/world.routes";
import eventRoutes from "./routes/event.routes";
import membershipRoutes from "./routes/worldMembership.routes";
import noteRoutes from "./routes/note.routes";
import { FRONTEND_URL, PORT } from "./config";

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
app.use("/api/boss", bossRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/user", userRoutes);
app.use("/api/world", worldRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
