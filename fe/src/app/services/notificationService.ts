import { apiService } from "./apiService";

export const notificationService = {
  async fetchNotifications(viewerUid: string) {
    try {
      const data = await apiService.get(`/notifications/${viewerUid}`);
      return data.notifications || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },
};