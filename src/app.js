import exress from "express";
import cookieParser from "cookie-parser";

const app = exress();
app.use(exress.json());
app.use(cookieParser());

// importing the routes
import authRouter from "./routes/users.routes.js";

//all the routs here
app.use("/api/auth", authRouter);

export default app;
