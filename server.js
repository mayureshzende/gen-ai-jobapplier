import dotenv from "dotenv";
import app from "./src/app.js";
import { connectTODatabase } from "./src/config/database.js";
dotenv.config();

connectTODatabase();

app.listen(process.env.PORT, () => {
  console.log("The server is running on port 3000");
});
