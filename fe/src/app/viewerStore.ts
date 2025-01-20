import { create } from 'zustand';
import { reviewService } from './services/reviewService';

interface ViewerState {
  reviewOwner1Status: string | null;
  reviewOwner2Status: string | null;
  updateReviewOwner1Status: (status: string) => Promise<void>;
  updateReviewOwner2Status: (status: string) => Promise<void>;
}

const useViewerStore = create<ViewerState>(() => ({
  reviewOwner1Status: null,
  reviewOwner2Status: null,

  updateReviewOwner1Status: async (status) => {
    await reviewService.postReviewStatus('owner__001', status);
  },

  updateReviewOwner2Status: async (status) => {
    await reviewService.postReviewStatus('owner__002', status);
  },
}));

export default useViewerStore;
