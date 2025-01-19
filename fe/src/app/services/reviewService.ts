const BASE_URL = 'http://localhost:8000';

export const reviewService = {
  async postReviewStatus(ownerId: string, status: string) {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ownerId, status }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update status for ${ownerId}`);
      }
      console.log(`Status updated for ${ownerId}:`, status);
      return true;
    } catch (error) {
      console.error('Failed to update status:', error);
      return false;
    }
  },
};
