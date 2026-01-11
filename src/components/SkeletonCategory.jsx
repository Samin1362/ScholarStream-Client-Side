// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SkeletonCategory = () => {
  return (
    <div className="bg-base-200 rounded-box overflow-hidden shadow-lg border border-base-300 h-full">
      <div className="p-6">
        {/* Icon Skeleton */}
        <div className="w-16 h-16 rounded-full bg-base-300 mb-4 animate-pulse"></div>

        {/* Category Name Skeleton */}
        <div className="h-6 w-3/4 bg-base-300 rounded mb-2 animate-pulse"></div>

        {/* Count Badge Skeleton */}
        <div className="inline-block h-6 w-32 bg-base-300 rounded-full mb-3 animate-pulse"></div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-base-300 rounded animate-pulse"></div>
          <div className="h-3 w-5/6 bg-base-300 rounded animate-pulse"></div>
        </div>

        {/* Arrow Icon Skeleton */}
        <div className="flex items-center">
          <div className="h-4 w-16 bg-base-300 rounded animate-pulse"></div>
          <div className="ml-2 w-5 h-5 bg-base-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCategory;
