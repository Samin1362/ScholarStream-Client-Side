// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SkeletonTestimonial = () => {
  return (
    <div className="bg-base-200 rounded-box p-6 shadow-lg border border-base-300 h-full flex flex-col">
      {/* Quote Icon Skeleton */}
      <div className="mb-4">
        <div className="w-10 h-10 bg-base-300 rounded animate-pulse"></div>
      </div>

      {/* Rating Stars Skeleton */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="w-4 h-4 bg-base-300 rounded animate-pulse"></div>
        ))}
        <div className="ml-2 h-4 w-12 bg-base-300 rounded animate-pulse"></div>
      </div>

      {/* Review Comment Skeleton */}
      <div className="space-y-2 mb-6 grow">
        <div className="h-3 w-full bg-base-300 rounded animate-pulse"></div>
        <div className="h-3 w-full bg-base-300 rounded animate-pulse"></div>
        <div className="h-3 w-4/5 bg-base-300 rounded animate-pulse"></div>
      </div>

      {/* User Info Skeleton */}
      <div className="flex items-center gap-4 pt-4 border-t border-base-300">
        <div className="w-12 h-12 bg-base-300 rounded-full animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-base-300 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-base-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTestimonial;
