import React, { useState } from 'react';
import SideBar from '../../components/generalComponents/SideBar';
import UserList from '../../components/AdminComponents/userList';
import HostList from '../../components/AdminComponents/HostList';


function AdminDashboard() {
  const [activeView, setActiveView] = useState('user');

  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 p-4 relative">
        {/* Top Right Buttons */}
        <div className="absolute top-4 right-4 flex gap-4">
          <button
            onClick={() => setActiveView('user')}
            className={`px-4 py-2 rounded-md shadow ${
              activeView === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveView('host')}
            className={`px-4 py-2 rounded-md shadow ${
              activeView === 'host' ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            Host Management
          </button>
        </div>

        {/* List Section */}
        <div className="mt-20">
          {activeView === 'user' ? <UserList /> : <HostList />}
        </div>
      </div>
        <div>

        </div>
    </div>
  );
}

export default AdminDashboard;
