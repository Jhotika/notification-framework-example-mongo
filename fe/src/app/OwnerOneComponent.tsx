/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import useNotificationStore from './store/notificationStore';

const FETCH_INTERVAL = 10000;

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const OwnerOneComponent = () => {
  const notifications = useNotificationStore((state: any) => state.notifications);
  const isLoading = useNotificationStore((state: any) => state.isLoading);
  const fetchNotificationsForOwner001 = useNotificationStore((state: any) => state.fetchNotificationsForOwner001);
  const [countdown, setCountdown] = useState(FETCH_INTERVAL / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotificationsForOwner001();
      setCountdown(FETCH_INTERVAL / 1000);
    }, FETCH_INTERVAL);

    const countdownId = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : FETCH_INTERVAL / 1000));
    }, 1000);

    fetchNotificationsForOwner001();
    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [fetchNotificationsForOwner001]);

  return (
    <div className="flex flex-col h-[calc(100vh-34px)]">
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-gray-600">📬</span>
          <h2 className="text-lg font-semibold text-gray-800">Reviews Status</h2>
        </div>
        
        <div className="mb-2 text-sm text-gray-500">
          {isLoading ? 'Loading...' : `Fetching new data in: `}
          <strong>{countdown}</strong> seconds
        </div>

        <div className="space-y-3">
          {notifications.map((notification: any) => (
            <div 
              key={notification.id}
              className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-700">{notification.message}</p>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(notification.notification.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerOneComponent;
