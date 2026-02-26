import React from "react";

export default function FiltersSidebar({ categories, filters }) {
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
            <div className="relative my-6 h-1 w-full rounded-full bg-(--divider-color)">
              {/* Selected range */}
              <div className="absolute left-[20%] right-[30%] h-full rounded-full bg-(--primary-color)" />

              {/* Handles */}
              <div className="absolute left-[20%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-(--white-color) ring-2 ring-(--accent-color) shadow-sm" />
              <div className="absolute right-[30%] top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-(--white-color) ring-2 ring-(--accent-color) shadow-sm" />
            </div>

            <div className="flex items-center justify-between text-sm font-medium text-(--text-color)">
              <span>${filters.price.min}</span>
              <span>${filters.price.max}</span>
            </div>
          </div>
        </section>

        {/* Sort */}
        <section>
          <h3 className="mb-4 font-accent text-xl font-semibold text-(--primary-color)">
            Sort By
          </h3>

          <div className="space-y-3">
            {filters.sort.map((label, idx) => (
              <label
                key={label}
                className="group flex cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  name="sort"
                  defaultChecked={idx === 0}
                  className="h-4 w-4 border-2 border-(--divider-color) text-(--primary-color) focus:ring-2 focus:ring-(--accent-color)/40 focus:ring-offset-2 focus:ring-offset-(--white-color)"
                />
                <span className="text-sm text-(--text-color)/80 transition-colors group-hover:text-(--primary-color)">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
