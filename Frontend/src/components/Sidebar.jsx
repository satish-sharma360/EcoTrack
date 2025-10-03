import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Button from './common/Button';
import { HomeIcon, SettingsIcon,MapPin,Trash, Coins ,Medal } from 'lucide-react';

const Sidebar = ({ open }) => {
  const location = useLocation();
  
  const sidebarItems = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/report', icon: MapPin, label: 'Report Waste' },
    { href: '/collect', icon: Trash, label: 'Collect Waste' },
    { href: '/rewards', icon: Coins, label: 'Rewards' },
    { href: '/leaderboard', icon: Medal, label: 'Leaderboard' },
  ];

  return (
    <aside className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20`}>
      <nav className="h-full flex flex-col justify-between p-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${
                  location.pathname === item.href
                    ? 'bg-[#86c537] bg-opacity-10 text-[#024130]'
                    : 'text-gray-600'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
        <Link to="/settings">
          <Button variant="outline" className="w-full">
            <SettingsIcon className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar
