const BASE_URL = 'http://localhost:8000';

export const notificationService = {
  async fetchNotifications(
    viewerUid: string,
  ) {
    try {
      const response = await fetch(`${BASE_URL}/notifications/${viewerUid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      return data.notifications || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },
};
