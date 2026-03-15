"use client";
import React from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function FiltersSidebar({ categories, filters, currentPriceRange, onPriceChange, currentSort, onSortChange }) {
  const { formatPrice } = useCurrency();

  return (
    <aside className="rounded-[18px] border border-(--divider-color) bg-(--white-color) p-5 lg:p-6">
      <div className="space-y-8">
        {/* Categories */}
        <section className="border-b border-(--divider-color) pb-6">
          <h3 className="mb-4 font-accent text-xl font-semibold text-(--primary-color)">
            Categories
          </h3>

          <div className="space-y-1">
            {categories.map((cat) => (
              <details
                key={cat.label}
                className="group border-t border-(--divider-color)/50 first:border-t-0"
                open={cat.label === "Skincare"}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-medium text-(--primary-color) transition-colors hover:text-(--accent-color)">
                  <span>{cat.label}</span>
                  <span className="select-none text-xs text-(--text-color)/70 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                {cat.children?.length ? (
                  <div className="flex flex-col gap-2 pb-3 pl-2 pt-1 text-sm">
                    {cat.children.map((child) => {
                      const isActive = child === "Moisturizers"; // replace with your real state
                      return (
                        <a
                          key={child}
                          href="#"
                          className={[
                            "relative pl-3 text-(--text-color)/80 transition-colors hover:text-(--primary-color)",
                            isActive ? "font-medium text-(--primary-color)" : "",
                          ].join(" ")}
                        >
                          {/* Active indicator (premium, not loud) */}
                          {isActive ? (
                            <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-(--accent-color)" />
                          ) : null}
                          {child}
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </details>
            ))}
          </div>
        </section>

        {/* Price Range (UI-only) */}
        <section className="border-b border-(--divider-color) pb-6">
          <h3 className="mb-4 font-accent text-xl font-semibold text-(--primary-color)">
            Price Range
          </h3>

          <div className="px-1">
            <div className="flex flex-col gap-4 mt-6 mb-2">
              <div className="flex items-center justify-between text-sm font-bold text-(--primary-color)">
                <span>{formatPrice(currentPriceRange?.min || filters.price.min)}</span>
                <span>{formatPrice(currentPriceRange?.max || filters.price.max)}</span>
              </div>

              <div className="relative h-1 w-full bg-(--divider-color) rounded-lg mb-2 mt-2">
                {/* Active Track Highlight */}
                <div
                  className="absolute h-full bg-(--accent-color) rounded-lg pointer-events-none transition-all duration-75"
                  style={{
                    left: `${(( (currentPriceRange?.min ?? filters.price.min) - filters.price.min ) / (filters.price.max - filters.price.min)) * 100}%`,
                    right: `${100 - (( (currentPriceRange?.max ?? filters.price.max) - filters.price.min ) / (filters.price.max - filters.price.min)) * 100}%`
                  }}
                />

                {/* Min Slider */}
                <input
                  type="range"
                  min={filters.price.min}
                  max={filters.price.max}
                  value={currentPriceRange?.min || filters.price.min}
                  onChange={(e) => {
                    const newMin = Number(e.target.value);
                    const currentMax = currentPriceRange?.max || filters.price.max;
                    if (onPriceChange) {
                      onPriceChange({
                        min: Math.min(newMin, currentMax - 1), // prevent thumbs from totally locking
                        max: currentMax
                      });
                    }
                  }}
                  className="absolute w-full -top-2 h-5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-(--white-color) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--accent-color) [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing z-20"
                />

                {/* Max Slider */}
                <input
                  type="range"
                  min={filters.price.min}
                  max={filters.price.max}
                  value={currentPriceRange?.max || filters.price.max}
                  onChange={(e) => {
                    const newMax = Number(e.target.value);
                    const currentMin = currentPriceRange?.min || filters.price.min;
                    if (onPriceChange) {
                      onPriceChange({
                        min: currentMin,
                        max: Math.max(newMax, currentMin + 1)
                      });
                    }
                  }}
                  className="absolute w-full -top-2 h-5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-(--white-color) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--accent-color) [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing z-30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sort */}
        <section>
          <h3 className="mb-4 font-accent text-xl font-semibold text-(--primary-color)">
            Sort By
          </h3>

          <div className="space-y-3">
            {filters.sort.map((label, idx) => {
              const isSelected = currentSort === label || (!currentSort && idx === 0);

              return (
                <label
                  key={label}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="sort"
                    checked={isSelected}
                    onChange={() => onSortChange && onSortChange(label)}
                    className="hidden"
                  />

                  {/* Custom radio */}
                  <div
                    className={`relative h-5 w-5 rounded-full border-2 transition-all duration-200
            ${isSelected
                        ? "border-(--accent-color)"
                        : "border-(--divider-color) group-hover:border-(--accent-color)/60"
                      }`}
                  >
                    <div
                      className={`absolute inset-1 rounded-full bg-(--accent-color) transition-all duration-200
              ${isSelected ? "scale-100" : "scale-0"}`}
                    />
                  </div>

                  <span
                    className={`text-sm transition-colors
            ${isSelected
                        ? "text-(--primary-color) font-medium"
                        : "text-(--text-color)/80 group-hover:text-(--primary-color)"
                      }`}
                  >
                    {label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>


      </div>
    </aside>
  );
}
