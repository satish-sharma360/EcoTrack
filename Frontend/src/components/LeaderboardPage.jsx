import { Award, Crown, Loader, Trophy, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const DUMMY_USER = {
  id: 1,
  email: 'user@ecotrack.com',
  name: 'John Doe',
  balance: 150
};


const getAllRewards = async () => {
  // API CALL: Replace with actual endpoint - GET /api/leaderboard
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, userId: 1, points: 250, level: 5, userName: 'John Doe' },
      { id: 2, userId: 2, points: 320, level: 6, userName: 'Jane Smith' },
      { id: 3, userId: 3, points: 180, level: 4, userName: 'Bob Johnson' },
      { id: 4, userId: 4, points: 420, level: 8, userName: 'Alice Williams' }
    ].sort((a, b) => b.points - a.points)), 500);
  });
};



const LeaderboardPage = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API CALL: Fetch leaderboard data - GET /api/leaderboard
    getAllRewards().then((data) => {
      setRewards(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-[#86c537]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-[#024130]">Leaderboard</h1>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#86c537] to-[#024130] p-6">
          <div className="flex justify-between items-center text-white">
            <Trophy className="h-10 w-10" />
            <span className="text-2xl font-bold">Top Performers</span>
            <Award className="h-10 w-10" />
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Points</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Level</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((reward, index) => (
              <tr key={reward.id} className={`${DUMMY_USER.id === reward.userId ? 'bg-green-50' : ''} hover:bg-gray-50`}>
                <td className="px-6 py-4">
                  {index < 3 ? (
                    <Crown className={`h-6 w-6 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-yellow-600'}`} />
                  ) : (
                    <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{reward.userName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-[#86c537] mr-2" />
                    <div className="text-sm font-semibold text-gray-900">{reward.points.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-[#86c537] bg-opacity-10 text-[#024130]">
                    Level {reward.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage
