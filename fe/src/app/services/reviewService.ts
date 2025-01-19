import { apiService } from "./apiService";

export const reviewService = {
  async postReviewStatus(ownerId: string, status: string) {
    try {
      await apiService.post('/reviews', { ownerId, status });
      console.log(`Status updated for ${ownerId}:`, status);
      return true;
    } catch (error) {
      console.error('Failed to update status:', error);
      return false;
    }
  },
};
