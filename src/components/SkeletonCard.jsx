// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-300 overflow-hidden">
      {/* Image Skeleton */}
      <figure className="relative h-48 overflow-hidden bg-base-200">
        <div className="w-full h-full animate-pulse bg-base-300"></div>
        {/* Badge Skeletons */}
        <div className="absolute top-4 right-4">
          <div className="h-6 w-20 bg-base-300 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-4 left-4">
          <div className="h-6 w-16 bg-base-300 rounded-full animate-pulse"></div>
        </div>
      </figure>

      {/* Card Body Skeleton */}
      <div className="card-body p-6">
        {/* University Name Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-base-300 rounded-full animate-pulse"></div>
          <div className="h-4 w-32 bg-base-300 rounded animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 w-full bg-base-300 rounded animate-pulse"></div>
          <div className="h-6 w-3/4 bg-base-300 rounded animate-pulse"></div>
        </div>

        {/* Details Skeleton */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-40 bg-base-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-24 bg-base-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-36 bg-base-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-20 bg-base-300 rounded animate-pulse"></div>
            <div className="h-3 w-28 bg-base-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="card-actions mt-4">
          <div className="h-12 w-full bg-base-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
