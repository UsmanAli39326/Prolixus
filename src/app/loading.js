import React from "react";

export default function Loading() {

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-(--primary-color)/90">
      <div className="relative h-[140px] w-[140px]">
        
        {/* Rotating Border */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-(--white-color) border-l-(--white-color) animate-spin" />

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/new/Prolixus-Logo-white.webp"
            alt="Loading"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>

      </div>
    </div>
  );
}