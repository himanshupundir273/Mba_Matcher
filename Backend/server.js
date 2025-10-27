const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://mba-matcher-three.vercel.app", // frontend domain
      "https://mba-matcher-jvf5.vercel.app", // backend domain (optional)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle OPTIONS preflight
app.options(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://mba-matcher-three.vercel.app",
      "https://mba-matcher-jvf5.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB connection and routes
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const universityRoutes = require("./routes/universities");
const userRoutes = require("./routes/users");
const searchRoutes = require("./routes/searches");

app.use("/api/universities", universityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/searches", searchRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
