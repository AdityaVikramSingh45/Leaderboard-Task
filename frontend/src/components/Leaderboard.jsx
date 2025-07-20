import React from "react"

const Leaderboard = ({ users }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-xl max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🏆 Leaderboard</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className={`flex items-center justify-between p-5 rounded-xl shadow-md transition transform hover:scale-[1.02] ${
              user.rank === 1
                ? "bg-yellow-100 border-l-4 border-yellow-400"
                : user.rank === 2
                ? "bg-gray-100 border-l-4 border-gray-400"
                : user.rank === 3
                ? "bg-orange-100 border-l-4 border-orange-400"
                : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{getRankIcon(user.rank)}</div>
              <div className="w-10 h-10 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center font-semibold uppercase">
                {user.name?.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">Rank #{user.rank}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-indigo-600">{user.totalPoints}</p>
              <p className="text-xs text-gray-500">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
