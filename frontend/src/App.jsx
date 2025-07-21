"use client"

import { useState, useEffect } from "react"
import UserSelector from "./components/UserSelector"
import Leaderboard from "./components/Leaderboard"
import ClaimHistory from "./components/ClaimHistory"
import AddUser from "./components/AddUser"
import { getUsers, claimPoints, getClaimHistory } from "./services/api"
import "./App.css"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2000/api"

function App() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [claimHistory, setClaimHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchUsers()
    fetchClaimHistory()
    initializeUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchClaimHistory = async () => {
    try {
      const data = await getClaimHistory()
      setClaimHistory(data)
    } catch (error) {
      console.error("Error fetching claim history:", error)
    }
  }

 const initializeUsers = async () => {
  try {
    await fetch(`${API_BASE_URL}/users/initialize`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Error initializing users:", error);
  }
};


  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage("Please select a user first!")
      return
    }

    setLoading(true)
    try {
      const result = await claimPoints(selectedUser)
      setMessage(`🎉 ${result.user.name} earned ${result.pointsAwarded} points!`)
      await fetchUsers()
      await fetchClaimHistory()
    } catch (error) {
      setMessage("Error claiming points. Please try again.")
      console.error("Error claiming points:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserAdded = () => {
    fetchUsers()
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-rose-700 mb-8">🏆 Leaderboard System</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <div className="bg-pink-100 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-rose-600 mb-4">Claim Points</h2>
              <UserSelector users={users} selectedUser={selectedUser} onUserSelect={setSelectedUser} />
              <button
                onClick={handleClaimPoints}
                disabled={loading || !selectedUser}
                className="w-full mt-4 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-200 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? "Claiming..." : "🎲 Claim Random Points"}
              </button>
              {message && (
                <div className="mt-4 p-3 bg-rose-100 border border-rose-300 text-rose-800 rounded-md shadow">
                  {message}
                </div>
              )}
            </div>

            <AddUser onUserAdded={handleUserAdded} />
          </div>

          {/* Right Column - Leaderboard */}
          <div>
            <Leaderboard users={users} />
          </div>
        </div>

        {/* Claim History */}
        <div className="mt-8">
          <ClaimHistory history={claimHistory} />
        </div>
      </div>
    </div>
  )
}

export default App
