"use client";
import React from "react";
import useViewerStore from "./viewerStore";

const ViewerComponent = () => {
  const { updateReviewOwner1Status, updateReviewOwner2Status } =
    useViewerStore();

  return (
    <div className="flex flex-col h-[calc(100vh-34px)] p-4 bg-white space-y-4">
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-gray-800 font-semibold">Review For Owner 1</p>
        <div className="flex space-x-2">
          <button
            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm"
            onClick={() => updateReviewOwner1Status("Approved")}
          >
            <span className="mr-1">✓</span>
            Approve
          </button>
          <button
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center text-sm"
            onClick={() => updateReviewOwner1Status("Rejected")}
          >
            <span className="mr-1">✕</span>
            Reject
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="text-sm text-gray-800 font-semibold">Review For Owner 2</p>
        <div className="flex space-x-2">
          <button
            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm"
            onClick={() => updateReviewOwner2Status("Approved")}
          >
            <span className="mr-1">✓</span>
            Approve
          </button>
          <button
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center text-sm"
            onClick={() => updateReviewOwner2Status("Rejected")}
          >
            <span className="mr-1">✕</span>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewerComponent;
