'use client';
import React from 'react';
import useViewerStore from './viewerStore';

const ViewerComponent = () => {
  const {
    reviewOwner1Status,
    reviewOwner2Status,
    updateReviewOwner1Status,
    updateReviewOwner2Status,
  } = useViewerStore();

  return (
    <div className="flex flex-col h-[calc(100vh-34px)]">
      <div className="p-4 bg-white space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Name: Review Owner 1</h3>
            <span>Status: {reviewOwner1Status || 'Pending'}</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm"
              onClick={() => updateReviewOwner1Status('approve')}
            >
              <span className="mr-1">✓</span>
              Approve
            </button>
            <button
              className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center text-sm"
              onClick={() => updateReviewOwner1Status('reject')}
            >
              <span className="mr-1">✕</span>
              Reject
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Name: Review Owner 2</h3>
            <span>Status: {reviewOwner2Status || 'Pending'}</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm"
              onClick={() => updateReviewOwner2Status('approve')}
            >
              <span className="mr-1">✓</span>
              Approve
            </button>
            <button
              className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center text-sm"
              onClick={() => updateReviewOwner2Status('reject')}
            >
              <span className="mr-1">✕</span>
              Reject
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        <div className="mb-4 flex items-center">
          <p>Review the statuses above.</p>
        </div>
      </div>
    </div>
  );
};

export default ViewerComponent;
