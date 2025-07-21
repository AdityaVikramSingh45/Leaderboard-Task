import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import claimRoutes from "./routes/claims.js"
import https from "https" //For self-ping functionality

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2000

// Middleware
const allowedOrigins = ["http://localhost:3000", "https://your-frontend-domain.com"]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/leaderboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})

// Routes
app.use("/api/users", userRoutes)
app.use("/api/claims", claimRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Leaderboard API is running!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

setInterval(() => {
  https.get("https://leaderboard-task-s4dj.onrender.com/", (res) => {
    console.log(`[Self-ping] ${new Date().toISOString()} - Status: ${res.statusCode}`)
  }).on("error", (err) => {
    console.error(`[Self-ping error] ${new Date().toISOString()} - ${err.message}`)
  })
}, 5 * 60 * 1000) 