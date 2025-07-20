import express from "express"
import User from "../models/User.js"

const router = express.Router()

// Get all users with rankings
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 })

    // Update rankings
    users.forEach((user, index) => {
      user.rank = index + 1
    })

    await Promise.all(users.map((user) => user.save()))

    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name } = req.body

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" })
    }

    const existingUser = await User.findOne({ name: name.trim() })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({ name: name.trim() })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Initialize default users
router.post("/initialize", async (req, res) => {
  try {
    const defaultUsers = ["Rahul", "Kamal", "Sanak", "Priya", "Amit", "Sneha", "Ravi", "Pooja", "Vikash", "Anita"]

    const existingUsers = await User.find()
    if (existingUsers.length > 0) {
      return res.json({ message: "Users already initialized", users: existingUsers })
    }

    const users = await User.insertMany(defaultUsers.map((name) => ({ name, totalPoints: 0, rank: 0 })))

    res.json({ message: "Default users created", users })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
