'use client'

import React, { useState } from 'react';

const OwnerTwoComponent = () => {
  const [notifications] = useState([
    { id: 1, message: "New review received from Viewer 001", time: "2 mins ago" },
    { id: 2, message: "Review approved by Viewer 001", time: "5 mins ago" },
    { id: 3, message: "Review pending from Viewer 001", time: "10 mins ago" }
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-34px)]">
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-gray-600">📬</span>
          <h2 className="text-lg font-semibold text-gray-800">Reviews Status</h2>
        </div>
        
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-700">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerTwoComponent;