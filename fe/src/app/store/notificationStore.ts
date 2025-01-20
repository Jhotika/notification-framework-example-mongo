/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { notificationService } from '../services/notificationService';

const useNotificationStore = create((set) => ({
  notifications: [],
  isLoading: false,
  setNotifications: (newNotifications: any) => set({ notifications: newNotifications }),
  setLoading: (status: any) => set({ isLoading: status }),

  fetchNotificationsForOwner001: async (
  ) => {
    set({ isLoading: true });
    try {
      const notifications = await notificationService.fetchNotifications(
        "owner__001",
      );
      set({ notifications });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useNotificationStore;
