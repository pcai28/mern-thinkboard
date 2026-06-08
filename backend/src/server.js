import express from "express"; // for type module
// const express = require("express"); // for type commonjs
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
// get path that is under the backend, from here we want go one up, go to frontend/dist

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
// needed only in development

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // serve our optimized React application as a static asset

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
// if we get a get request any route, other than routes with prefix "/api/notes"
// we'd like to serve our React application
// serve the index.html file (where your React application will be started)
// we only want to do this if we're in production

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
