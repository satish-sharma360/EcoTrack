import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import ReportPage from "./components/ReportPage";
import CollectPage from "./components/CollectPage";
import RewardsPage from "./components/RewardsPage";
import LeaderboardPage from "./components/LeaderboardPage";
import SettingsPage from "./components/SettingsPage";
import MessagesPage from "./components/MessagesPage";
import { useEffect, useState } from "react";

function App() {
  const DUMMY_USER = {
    id: 1,
    email: "user@ecotrack.com",
    name: "John Doe",
    balance: 150,
  };

  const getUserBalance = async (userId) => {
    // API CALL: Replace with actual endpoint - GET /api/users/{userId}/balance
    return new Promise((resolve) => {
      setTimeout(() => resolve(DUMMY_USER.balance), 300);
    });
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balance, setBalance] = useState(150);

  useEffect(() => {
    // API CALL: Fetch user balance on mount
    getUserBalance(DUMMY_USER.id).then(setBalance);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} balance={balance} />
      <div className="flex">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/collect" element={<CollectPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
