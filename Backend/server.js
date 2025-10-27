const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ STEP 1 — Apply CORS Globally & Early
const allowedOrigins = [
  "http://localhost:5173",
  "https://mba-matcher-three.vercel.app",
  "https://mba-matcher-jvf5.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ✅ STEP 2 — Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ STEP 3 — Import Routes
const universityRoutes = require("./routes/universities");
const userRoutes = require("./routes/users");
const searchRoutes = require("./routes/searches");

// ✅ STEP 4 — Use Routes
app.use("/api/universities", universityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/searches", searchRoutes);

// ✅ Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
