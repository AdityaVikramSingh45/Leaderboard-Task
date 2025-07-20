import express from "express"
import User from "../models/User.js"
import ClaimHistory from "../models/ClaimHistory.js"

const router = express.Router()

// Claim points for a user
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate random points between 1 and 10
    const pointsAwarded = Math.floor(Math.random() * 10) + 1

    // Update user's total points
    user.totalPoints += pointsAwarded
    await user.save()

    // Create claim history record
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsAwarded,
    })
    await claimHistory.save()

    // Update all user rankings
    const allUsers = await User.find().sort({ totalPoints: -1 })
    await Promise.all(
      allUsers.map((u, index) => {
        u.rank = index + 1
        return u.save()
      }),
    )

    res.json({
      message: "Points claimed successfully",
      user: await User.findById(userId),
      pointsAwarded,
      claimHistory,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get claim history
router.get("/history", async (req, res) => {
  try {
    const history = await ClaimHistory.find().populate("userId", "name").sort({ claimedAt: -1 }).limit(50)

    res.json(history)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
