export default function Loading() {
  return (
    <div className="bg-(--secondary-color) overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Image Skeleton */}
          <div className="animate-pulse">
            <div className="aspect-4/5 w-full rounded-[18px] bg-gray-200 lg:aspect-square"></div>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 rounded-xl bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Right Column: Info Skeleton */}
          <div className="flex flex-col gap-6 pt-4 lg:pt-0 animate-pulse">
            {/* Title & Price */}
            <div>
              <div className="h-4 w-24 rounded-full bg-gray-200 mb-4"></div>
              <div className="h-10 w-3/4 rounded-lg bg-gray-200 mb-4"></div>
              <div className="h-8 w-1/4 rounded-lg bg-gray-200"></div>
            </div>

            {/* Badges/Rating skeleton */}
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-gray-200"></div>
              <div className="h-6 w-24 rounded-full bg-gray-200"></div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Description Lines */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200"></div>
              <div className="h-4 w-4/6 rounded bg-gray-200"></div>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-8 w-32 rounded-lg bg-gray-200"></div>
                <div className="h-12 w-32 rounded-full bg-gray-200"></div>
              </div>
              <div className="h-14 w-full rounded-full bg-gray-200"></div>
            </div>
            
            {/* Accordion Skeletons */}
            <div className="mt-8 space-y-4">
               <div className="h-12 w-full rounded-lg bg-gray-200"></div>
               <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
