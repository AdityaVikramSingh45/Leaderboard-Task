"use client"

const UserSelector = ({ users, selectedUser, onUserSelect }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="user-select"
        className="block text-base font-semibold text-gray-800 mb-2"
      >
        👤 Choose a User
      </label>
      <div className="relative">
        <select
          id="user-select"
          value={selectedUser}
          onChange={(e) => onUserSelect(e.target.value)}
          className="block w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          <option value="" disabled>
            🔍 Select a user...
          </option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} — {user.totalPoints} pts
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          ▼
        </div>
      </div>
    </div>
  )
}

export default UserSelector
