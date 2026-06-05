import express from "express"; // for type module
// const express = require("express"); // for type commonjs
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json()); // allows us to parse JSON bodies: req.body
app.use(rateLimiter);
// simple custom middleware
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next(); // call the next function, 不调用这个，请求就会在这里"卡住"，永远没有响应
});

app.use("/api/notes", notesRoutes); // prefix
// app.use("/api/product", productRoutes);
// app.use("/api/posts", postsRoutes);
// app.use("/api/payments", paymentsRoutes);
// app.use("/api/users", usersRoutes);
// separate every single service into its own file

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
