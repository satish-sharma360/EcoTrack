import React from "react";
import { useState } from "react";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}

      <div className="flex flex-1">
        {/* Sidebar */}
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
