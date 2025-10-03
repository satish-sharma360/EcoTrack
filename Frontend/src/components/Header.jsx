import { Link, useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { Bell, ChevronDown, Coins, Leaf, LogIn, Menu, Search, User } from 'lucide-react'
import Badge from "./common/Badge";
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../context/Authcontext";


const DUMMY_USER = {
  id: 1,
  email: 'user@ecotrack.com',
  name: 'John Doe',
  balance: 150
};

// Dummy API: Get user by email
const getUserByEmail = async (email) => {
  // API CALL: Replace with actual endpoint - GET /api/users?email={email}
  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_USER), 500);
  });
};

// Dummy API: Get user balance
const getUserBalance = async (userId) => {
  // API CALL: Replace with actual endpoint - GET /api/users/{userId}/balance
  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_USER.balance), 300);
  });
};

// Dummy API: Get notifications
const getUnreadNotifications = async (userId) => {
  // API CALL: Replace with actual endpoint - GET /api/notifications/unread?userId={userId}
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, type: 'Reward', message: 'You earned 50 points!' },
      { id: 2, type: 'Task', message: 'New waste collection task available' }
    ]), 300);
  });
};



// Dummy API: Create report
const createReport = async (userId, location, wasteType, amount, image, verification) => {
  // API CALL: Replace with actual endpoint - POST /api/reports
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      id: Date.now(),
      userId,
      location,
      wasteType,
      amount,
      image,
      verification,
      createdAt: new Date()
    }), 500);
  });
};

// Dummy API: Get waste collection tasks







const Header = ({ onMenuClick, balance }) => {
  const {user} = useContext(Authcontext)
  const [loggedIn, setLoggedIn] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API CALL: Fetch notifications
    getUnreadNotifications(DUMMY_USER.id).then(setNotifications);
    console.log("user",user)
  }, []);

  const handleLogin = () => {
    // API CALL: Implement Web3Auth login - POST /api/auth/login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // API CALL: Implement logout - POST /api/auth/logout
    setLoggedIn(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onMenuClick} className="mr-4 p-2">
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#86c537] to-[#024130] flex items-center justify-center mr-3">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#024130]">EcoTrack</span>
              <span className="text-xs text-gray-500">Waste Management</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#86c537]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" onClick={() => setShowNotifications(!showNotifications)} className="p-2 relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5">
                  {notifications.length}
                </Badge>
              )}
            </Button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                      <p className="font-medium text-sm">{notif.type}</p>
                      <p className="text-xs text-gray-600">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center bg-gradient-to-r from-[#86c537] to-[#75b02f] rounded-full px-4 py-2">
            <Coins className="h-5 w-5 mr-2 text-white" />
            <span className="font-semibold text-white">{balance}</span>
          </div>

          {!loggedIn ? (
            <Button onClick={handleLogin} className="bg-[#024130] hover:bg-[#035843]">
              Login
              <LogIn className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <div className="relative">
              <Button variant="ghost" onClick={() => setShowUserMenu(!showUserMenu)} className="p-2">
                <User className="h-5 w-5 mr-1" />
                <ChevronDown className="h-4 w-4" />
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-3 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-2 hover:bg-gray-50">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50">Settings</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header
