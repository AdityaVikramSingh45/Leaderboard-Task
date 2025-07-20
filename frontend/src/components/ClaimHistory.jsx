const ClaimHistory = ({ history }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📊 <span>Recent Claims</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg">
              <th className="px-4 py-3 rounded-l-lg">👤 User</th>
              <th className="px-4 py-3">✨ Points</th>
              <th className="px-4 py-3 rounded-r-lg">⏰ Time</th>
            </tr>
          </thead>
          <tbody>
            {history.slice(0, 10).map((claim) => (
              <tr
                key={claim._id}
                className="bg-white hover:bg-gray-50 transition-all duration-200 rounded-xl shadow-sm"
              >
                <td className="px-4 py-3 font-medium text-gray-800">{claim.userName}</td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    +{claim.pointsAwarded}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">{new Date(claim.claimedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClaimHistory
