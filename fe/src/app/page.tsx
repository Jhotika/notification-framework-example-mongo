'use client'

import OwnerOneComponent from "./OwnerOneComponent"
import OwnerTwoComponent from "./OwnerTwoComponents"
import ViewerComponent from "./ViewerComponents"

export default function Page() {
  return (
    <main className="flex h-screen">
      <div className="flex-1 border-r border-gray-200">
        <div className="p-2 bg-blue-50 border-b text-center">
          <h2 className="font-semibold text-blue-800">Viewer</h2>
        </div>
          <ViewerComponent />
      </div>
      
      <div className="flex-1 border-r border-gray-200">
        <div className="p-2 bg-blue-50 border-b text-center">
          <h2 className="font-semibold text-blue-800">Owner 1</h2>
        </div>
        <OwnerOneComponent />
      </div>
      
      <div className="flex-1">
        <div className="p-2 bg-blue-50 border-b text-center">
          <h2 className="font-semibold text-blue-800">Owner 2</h2>
        </div>
        <OwnerTwoComponent />
      </div>
    </main>
  )
}