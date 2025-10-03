import React, { useContext, useEffect, useState } from 'react'
import Button from './common/Button';
import { Calendar, CheckCircle, Clock, Loader, MapPin, Trash, Weight } from 'lucide-react';
import { Authcontext } from '../context/Authcontext';



const DUMMY_USER = {
  id: 1,
  email: 'user@ecotrack.com',
  name: 'John Doe',
  balance: 150
};

const getWasteCollectionTasks = async (limit = 10) => {
  // API CALL: Replace with actual endpoint - GET /api/tasks?limit={limit}
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, location: 'Park Avenue', wasteType: 'Plastic Bottles', amount: '10 kg', status: 'pending', date: '2025-10-03', collectorId: null },
      { id: 2, location: 'Main Street', wasteType: 'Paper', amount: '5 kg', status: 'in_progress', date: '2025-10-02', collectorId: 2 },
      { id: 3, location: 'Green Plaza', wasteType: 'Glass', amount: '8 kg', status: 'verified', date: '2025-10-01', collectorId: 1 }
    ]), 500);
  });
};



const CollectPage = () => {
    const {user} = useContext(Authcontext)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API CALL: Fetch collection tasks - GET /api/tasks
    getWasteCollectionTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    // API CALL: Update task status - PUT /api/tasks/{taskId}
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus, collectorId: DUMMY_USER.id } : task
    ));
  };

  const StatusBadge = ({ status }) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      in_progress: { color: 'bg-blue-100 text-blue-800', icon: Trash, label: 'In Progress' },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Completed' },
      verified: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle, label: 'Verified' }
    };
    const { color, icon: Icon, label } = configs[status];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${color} flex items-center`}>
        <Icon className="mr-1 h-3 w-3" />
        {label}
      </span>
    );
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
      <h1 className="text-3xl font-semibold mb-6 text-[#024130]">Waste Collection Tasks</h1>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#86c537]" />
                {task.location}
              </h2>
              <StatusBadge status={task.status} />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Trash className="w-4 h-4 mr-2 text-gray-500" />
                {task.wasteType}
              </div>
              <div className="flex items-center">
                <Weight className="w-4 h-4 mr-2 text-gray-500" />
                {task.amount}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {task.date}
              </div>
            </div>
            <div className="flex justify-end">
              {task.status === 'pending' && (
                <Button onClick={() => handleStatusChange(task.id, 'in_progress')} variant="outline">
                  Start Collection
                </Button>
              )}
              {task.status === 'in_progress' && task.collectorId === user.id && (
                <Button onClick={() => handleStatusChange(task.id, 'verified')}>
                  Complete & Verify
                </Button>
              )}
              {task.status === 'verified' && (
                <span className="text-green-600 text-sm font-medium">Reward Earned</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectPage
