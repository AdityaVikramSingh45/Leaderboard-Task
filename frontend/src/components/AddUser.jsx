"use client"

import { useState } from "react"
import { addUser } from "../services/api"
import { Loader2 } from "lucide-react"

const AddUser = ({ onUserAdded }) => {
  const [newUserName, setNewUserName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddUser = async (e) => {
    e.preventDefault()
    if (!newUserName.trim()) {
      setMessage("Please enter a user name")
      return
    }

    setLoading(true)
    try {
      await addUser(newUserName.trim())
      setMessage(`✅ User "${newUserName}" added successfully!`)
      setNewUserName("")
      onUserAdded()
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error adding user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-white via-sky-50 to-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">👤 Add New User</h2>

      <form onSubmit={handleAddUser}>
        <label htmlFor="new-user" className="block text-sm font-medium text-gray-700 mb-2">
          User Name
        </label>
        <input
          type="text"
          id="new-user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition duration-200 mb-4"
          placeholder="e.g. Aditya Sharma"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Adding...
            </>
          ) : (
            "➕ Add User"
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-5 p-3 text-sm rounded-lg border ${
            message.includes("❌")
              ? "bg-red-50 border-red-300 text-red-700"
              : "bg-green-50 border-green-300 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default AddUser
