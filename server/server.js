import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

// connect to mongo.db
mongoose
  .connect(process.env.DATABASE_URL)
  .then((res) => console.log("DATABASE IS CONNECT"))
  .catch((err) => console.log(err));

//   run server
const port = process.env.PORT || 7001;
app.listen(port, () => console.log("server is run :)"));
