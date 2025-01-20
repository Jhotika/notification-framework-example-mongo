import { apiService } from "./apiService";

export const notificationService = {
  async fetchNotifications(viewerUid: string) {
    try {
      const data = await apiService.get(`/notifications/${viewerUid}`);
      console.log('Notifications:', data.notifications);
      return data.notifications || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },
};