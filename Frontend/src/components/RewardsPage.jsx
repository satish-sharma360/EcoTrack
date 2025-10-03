import { ArrowDownRight, ArrowUpRight, Coins, Gift, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Button from './common/Button';


const DUMMY_USER = {
  id: 1,
  email: 'user@ecotrack.com',
  name: 'John Doe',
  balance: 150
};
// Dummy API: Get reward transactions
const getRewardTransactions = async (userId) => {
  // API CALL: Replace with actual endpoint - GET /api/rewards/transactions?userId={userId}
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, type: 'earned_report', amount: 50, description: 'Reported waste at Green St', date: '2025-10-01' },
      { id: 2, type: 'earned_collect', amount: 75, description: 'Collected waste at Eco Ave', date: '2025-10-02' },
      { id: 3, type: 'redeemed', amount: 25, description: 'Redeemed Gift Card', date: '2025-10-03' }
    ]), 500);
  });
};


const RewardsPage = () => {
  const [balance, setBalance] = useState(150);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API CALL: Fetch reward transactions - GET /api/rewards/transactions
    getRewardTransactions(DUMMY_USER.id).then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  const rewards = [
    { id: 1, name: '$10 Gift Card', cost: 100, description: 'Redeem for a $10 gift card', collectionInfo: 'Digital code sent via email' },
    { id: 2, name: '$25 Gift Card', cost: 250, description: 'Redeem for a $25 gift card', collectionInfo: 'Digital code sent via email' },
    { id: 3, name: 'Premium Membership', cost: 500, description: 'Get 1 month premium access', collectionInfo: 'Auto-activated on account' }
  ];

  const handleRedeem = (rewardCost) => {
    if (balance >= rewardCost) {
      // API CALL: Redeem reward - POST /api/rewards/redeem
      setBalance(balance - rewardCost);
      alert('Reward redeemed successfully!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-[#86c537]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-[#024130]">Rewards</h1>
      
      <div className="bg-gradient-to-br from-[#86c537] to-[#024130] p-8 rounded-2xl shadow-lg mb-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Reward Balance</h2>
        <div className="flex items-center">
          <Coins className="w-12 h-12 mr-4" />
          <div>
            <span className="text-5xl font-bold">{balance}</span>
            <p className="text-sm opacity-90">Available Points</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#024130]">Recent Transactions</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                <div className="flex items-center">
                  {transaction.type.startsWith('earned') ? (
                    <ArrowUpRight className="w-5 h-5 text-green-500 mr-3" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.type.startsWith('earned') ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type.startsWith('earned') ? '+' : '-'}{transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#024130]">Available Rewards</h2>
          <div className="space-y-4">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{reward.name}</h3>
                  <span className="text-[#86c537] font-semibold">{reward.cost} pts</span>
                </div>
                <p className="text-gray-600 mb-2 text-sm">{reward.description}</p>
                <p className="text-sm text-gray-500 mb-4">{reward.collectionInfo}</p>
                <Button 
                  onClick={() => handleRedeem(reward.cost)}
                  className="w-full"
                  disabled={balance < reward.cost}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Redeem Reward
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage
