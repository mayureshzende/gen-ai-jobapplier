import exress from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = exress();

app.use(exress.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// importing the routes
import authRouter from "./routes/users.routes.js";
import interviewRouter from "./routes/interview.routes.js";

//all the routs here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
export default app;
