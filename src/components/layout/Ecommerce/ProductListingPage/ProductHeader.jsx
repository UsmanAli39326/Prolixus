import React from "react";

export default function ShopTopBar({ total = 0, showing = 0, onOpenFilters }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="text-sm text-(--text-color)/70">
        Showing {showing} of {total} products
      </span>

      <button
        type="button"
        onClick={onOpenFilters}
        className="lg:hidden inline-flex items-center gap-2 rounded-full border border-(--divider-color) bg-white/60 px-4 py-2 text-sm font-semibold text-(--primary-color) hover:text-(--accent-color) transition-colors"
      >
        <span className="text-[16px]"></span>
        Filters
      </button>
    </div>
  );
}
