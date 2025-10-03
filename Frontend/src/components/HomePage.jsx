import { ArrowRight, Coins, Leaf, MapPin, Recycle, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import { Link } from "react-router-dom";

// Dummy API: Get recent reports
const getRecentReports = async (limit = 10) => {
  // API CALL: Replace with actual endpoint - GET /api/reports/recent?limit={limit}
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            location: "123 Green St",
            wasteType: "Plastic",
            amount: "5 kg",
            createdAt: "2025-10-01",
          },
          {
            id: 2,
            location: "456 Eco Ave",
            wasteType: "Paper",
            amount: "3 kg",
            createdAt: "2025-10-02",
          },
          {
            id: 3,
            location: "789 Leaf Rd",
            wasteType: "Glass",
            amount: "2 kg",
            createdAt: "2025-10-03",
          },
        ]),
      500
    );
  });
};

// Dummy API: Get all rewards
const getAllRewards = async () => {
  // API CALL: Replace with actual endpoint - GET /api/leaderboard
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          [
            { id: 1, userId: 1, points: 250, level: 5, userName: "John Doe" },
            { id: 2, userId: 2, points: 320, level: 6, userName: "Jane Smith" },
            {
              id: 3,
              userId: 3,
              points: 180,
              level: 4,
              userName: "Bob Johnson",
            },
            {
              id: 4,
              userId: 4,
              points: 420,
              level: 8,
              userName: "Alice Williams",
            },
          ].sort((a, b) => b.points - a.points)
        ),
      500
    );
  });
};

const getWasteCollectionTasks = async (limit = 10) => {
  // API CALL: Replace with actual endpoint - GET /api/tasks?limit={limit}
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            location: "Park Avenue",
            wasteType: "Plastic Bottles",
            amount: "10 kg",
            status: "pending",
            date: "2025-10-03",
            collectorId: null,
          },
          {
            id: 2,
            location: "Main Street",
            wasteType: "Paper",
            amount: "5 kg",
            status: "in_progress",
            date: "2025-10-02",
            collectorId: 2,
          },
          {
            id: 3,
            location: "Green Plaza",
            wasteType: "Glass",
            amount: "8 kg",
            status: "verified",
            date: "2025-10-01",
            collectorId: 1,
          },
        ]),
      500
    );
  });
};

const HomePage = () => {
  const [impactData, setImpactData] = useState({
    wasteCollected: 0,
    reportsSubmitted: 0,
    tokensEarned: 0,
    co2Offset: 0,
  });

  useEffect(() => {
    // API CALL: Fetch impact statistics - GET /api/stats/impact
    Promise.all([
      getRecentReports(100),
      getAllRewards(),
      getWasteCollectionTasks(100),
    ]).then(([reports, rewards, tasks]) => {
      const wasteCollected = tasks.reduce((total, task) => {
        const match = task.amount.match(/(\d+(\.\d+)?)/);
        const amount = match ? parseFloat(match[0]) : 0;
        return total + amount;
      }, 0);

      setImpactData({
        wasteCollected: Math.round(wasteCollected * 10) / 10,
        reportsSubmitted: reports.length,
        tokensEarned: rewards.reduce(
          (total, reward) => total + reward.points,
          0
        ),
        co2Offset: Math.round(wasteCollected * 0.5 * 10) / 10,
      });
    });
  }, []);

  const AnimatedGlobe = () => (
    <div className="relative w-32 h-32 mx-auto mb-8">
      <div className="absolute inset-0 rounded-full bg-[#86c537] opacity-20 animate-pulse"></div>
      <div className="absolute inset-2 rounded-full bg-[#86c537] opacity-40 animate-ping"></div>
      <div className="absolute inset-4 rounded-full bg-[#75b02f] opacity-60 animate-spin"></div>
      <div className="absolute inset-6 rounded-full bg-[#86c537] opacity-80 animate-bounce"></div>
      <Leaf className="absolute inset-0 m-auto h-16 w-16 text-[#024130] animate-pulse" />
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
      <div className="bg-[#86c537] bg-opacity-10 p-4 rounded-full mb-6">
        <Icon className="h-8 w-8 text-[#024130]" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const ImpactCard = ({ title, value, icon: Icon }) => (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[#86c537] to-[#75b02f] text-white shadow-lg">
      <Icon className="h-10 w-10 mb-4 opacity-80" />
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-sm opacity-90">{title}</p>
    </div>
  );

  return (
    <div className="container mx-auto bg-[#2f4855]">
      <section className="text-center mb-20 ">
        <div className="w-full h-[400px] flex items-center justify-center">
          <img className="h-full" src="./header.png" alt="" />
        </div>
        <h1 className="text-6xl font-bold mb-6 text-[#ffffff]">
          EcoTrack <span className="text-[#86c537]">Waste Management</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Join our community in making waste management more efficient and
          rewarding!
        </p>
        <div className="flex items-center justify-center">
          <Link to="/report">
            <Button className="text-lg py-2.5 px-4 rounded-full bg-[#86c537] hover:bg-[#85c537c5]">
              Report Waste
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-10 mb-20 px-4">
        <FeatureCard
          icon={Leaf}
          title="Eco-Friendly"
          description="Contribute to a cleaner environment by reporting and collecting waste."
        />
        <FeatureCard
          icon={Coins}
          title="Earn Rewards"
          description="Get tokens for your contributions to waste management efforts."
        />
        <FeatureCard
          icon={Users}
          title="Community-Driven"
          description="Be part of a growing community committed to sustainable practices."
        />
      </section>

      <section className="bg-white p-10 shadow-lg">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#024130]">
          Our Impact
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <ImpactCard
            title="Waste Collected"
            value={`${impactData.wasteCollected} kg`}
            icon={Recycle}
          />
          <ImpactCard
            title="Reports Submitted"
            value={impactData.reportsSubmitted}
            icon={MapPin}
          />
          <ImpactCard
            title="Tokens Earned"
            value={impactData.tokensEarned}
            icon={Coins}
          />
          <ImpactCard
            title="CO2 Offset"
            value={`${impactData.co2Offset} kg`}
            icon={Leaf}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
