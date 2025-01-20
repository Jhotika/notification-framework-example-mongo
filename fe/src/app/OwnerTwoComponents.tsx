"use client";

import React, { useState, useEffect } from "react";
import useNotificationStore from "./store/notificationStore";
import { NotificationResponse } from "../../../commonTs/notification/NotificationResponse";

const FETCH_INTERVAL = 10000;

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const OwnerTwoComponent = () => {
  const notifications = useNotificationStore(
    (state) => state.notificationsForOwnerTwo
  );
  const isLoading = useNotificationStore((state) => state.isLoadingForOwnerTwo);
  const fetchNotificationsForOwner002 = useNotificationStore(
    (state) => state.fetchNotificationsForOwner002
  );

  let [countdown, setCountdown] = useState(FETCH_INTERVAL / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotificationsForOwner002();
      setCountdown(FETCH_INTERVAL / 1000);
    }, FETCH_INTERVAL);

    const countdownId = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : FETCH_INTERVAL / 1000));
    }, 1000);

    fetchNotificationsForOwner002();

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [fetchNotificationsForOwner002]);

  return (
    <div className="flex flex-col h-[calc(100vh-34px)]">
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-gray-600">📬</span>
          <h2 className="text-lg font-semibold text-gray-800">
            Reviews Status
          </h2>
        </div>

        <div className="mb-2 text-sm text-gray-500">
          {isLoading ? "Loading..." : `Fetching new data in: `}
          <strong>{countdown}</strong> seconds
        </div>

        <div className="space-y-3">
          {notifications.map((item: NotificationResponse) => {
            const notification = item.notification;
            return (
              <div
                key={notification._id}
                className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-700">
                    {notification.payload.message}
                  </p>
                  <p className="text-sm text-gray-700">
                    {notification.payload.reviewerName}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(notification.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OwnerTwoComponent;
