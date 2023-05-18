import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./route/authRouter.js";
// import coversationRoute from "./route/coversationRoute.js";
// import messageRoute from "./route/messageRoute.js"
const app = express();
dotenv.config();
app.use(express.json());

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(console.log("Connected to mongoDB."));
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


// app.use("/api/auth", authRouter);
// app.use("/api/conversations", coversationRoute);
// app.use("/api/messages", messageRoute);


app.listen("5000", () => {
    connect();
    console.log("Backend is Running");
  });