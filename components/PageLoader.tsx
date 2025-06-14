import React from 'react'

export default function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full size-24 border-t-4 border-b-4 border-t-custom-yellow border-b-custom-light-blue"></div>
    </div>
        </div>
  )
}
