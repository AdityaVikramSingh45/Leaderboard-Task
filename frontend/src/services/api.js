import { useEffect } from "react"

// const API_BASE_URL = "https://leaderboard-task-s4dj.onrender.com/api"
const API_BASE_URL = "http://localhost:2000/api"


export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`)
  console.log("API Base URL:", API_BASE_URL)
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  return response.json()
}

export const addUser = async (name) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw { response: { data: error } }
  }

  return response.json()
}

export const claimPoints = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })

  if (!response.ok) {
    throw new Error("Failed to claim points")
  }

  return response.json()
}

export const getClaimHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/claims/history`)
  if (!response.ok) {
    throw new Error("Failed to fetch claim history")
  }
  return response.json()
}
