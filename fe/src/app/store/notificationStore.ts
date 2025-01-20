import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { NotificationResponse } from "../../../../commonTs/notification/NotificationResponse";

interface NotificationState {
  notificationsForOwnerOne: NotificationResponse[];
  isLoadingForOwnerOne: boolean;
  notificationsForOwnerTwo: NotificationResponse[];
  isLoadingForOwnerTwo: boolean;
  fetchNotificationsForOwner001: () => Promise<void>;
  fetchNotificationsForOwner002: () => Promise<void>;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notificationsForOwnerOne: [],
  notificationsForOwnerTwo: [],
  isLoadingForOwnerOne: false,
  isLoadingForOwnerTwo: false,

  fetchNotificationsForOwner001: async () => {
    set({ isLoadingForOwnerOne: true });
    try {
      const notificationsForOwnerOne =
        await notificationService.fetchNotifications("owner__001");
      set({ notificationsForOwnerOne });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      set({ isLoadingForOwnerOne: false });
    }
  },

  fetchNotificationsForOwner002: async () => {
    set({ isLoadingForOwnerTwo: true });
    try {
      const notificationsForOwnerTwo =
        await notificationService.fetchNotifications(
          "owner__002" // Change owner identifier for Owner 2
        );
      set({ notificationsForOwnerTwo });
    } catch (error) {
      console.error("Failed to fetch notifications for Owner 2:", error);
    } finally {
      set({ isLoadingForOwnerTwo: false });
    }
  },
}));

export default useNotificationStore;
