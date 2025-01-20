import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { NotificationResponse } from "../../../../commonTs/notification/NotificationResponse";

interface NotificationState {
  notifications: NotificationResponse[];
  isLoading: boolean;
  setNotifications: (newNotifications: NotificationResponse[]) => void;
  setLoading: (status: boolean) => void;
  fetchNotificationsForOwner001: () => Promise<void>;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isLoading: false,

  setNotifications: (newNotifications) =>
    set((state) => {
      if (state.notifications !== newNotifications) {
        return { notifications: newNotifications };
      }
      return state;
    }),

  setLoading: (status) =>
    set((state) => {
      if (state.isLoading !== status) {
        return { isLoading: status };
      }
      return state;
    }),

  fetchNotificationsForOwner001: async () => {
    set({ isLoading: true });
    try {
      const notifications = await notificationService.fetchNotifications(
        "owner__001"
      );
      set({ notifications });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useNotificationStore;
