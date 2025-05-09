// import express from "express";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import dotenv from "dotenv";
// import { connectDB } from "./lib/db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { app, server } from "./lib/socket.js";

// import path from "path";

// dotenv.config();

// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // Increase payload limit for large image uploads
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.resolve(__dirname, "../../frontend/dist");
//   app.use(express.static(frontendPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }

// server.listen(PORT, () => {
//   console.log("Server is running on PORT:" + PORT);
//   connectDB();
// });

import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend domain
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist"); // Adjust path to frontend dist folder
  console.log("Serving static files from:", frontendPath);
  app.use(express.static(frontendPath)); // Serve the static files

  // Always return the index.html file for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});
