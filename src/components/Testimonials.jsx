import React, { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import SkeletonTestimonial from "./SkeletonTestimonial";

const Testimonials = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all reviews
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testimonials-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("reviews");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Get top reviews (highest rated or most recent) - limit to 6 for display
  const featuredReviews = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];

    // Sort by rating (highest first), then by most recent
    const sorted = [...reviews]
      .filter((review) => review.reviewComment && review.ratingPoint)
      .sort((a, b) => {
        const ratingA = a.ratingPoint || 0;
        const ratingB = b.ratingPoint || 0;

        if (ratingB !== ratingA) {
          return ratingB - ratingA; // Highest rating first
        }

        // If ratings are equal, sort by most recent
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });

    return sorted.slice(0, 6);
  }, [reviews]);

  // Get user initials for avatar
  const getUserInitials = (email) => {
    if (!email) return "U";
    const parts = email.split("@")[0];
    return parts.charAt(0).toUpperCase();
  };

  // Get user display name from email
  const getUserDisplayName = (email) => {
    if (!email) return "Anonymous User";
    const parts = email.split("@")[0];
    return parts.charAt(0).toUpperCase() + parts.slice(1);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-base-100">
        <div className="container mx-auto">
          {/* Header Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="h-12 w-80 bg-base-300 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-[500px] max-w-full bg-base-300 rounded mx-auto animate-pulse"></div>
          </motion.div>

          {/* Skeleton Testimonials Grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonTestimonial key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[400px] bg-base-200 py-12 px-4 flex justify-center items-center">
        <div className="text-center">
          <p className="text-error text-lg">Error loading testimonials</p>
        </div>
      </div>
    );
  }

  if (!featuredReviews || featuredReviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            What Students Say
          </h2>
          <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
            Read testimonials from students who have found success through
            ScholarStream
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredReviews.map((review, index) => (
            <motion.div
              key={review._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-base-200 rounded-box p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow h-full flex flex-col"
            >
              {/* Quote Icon */}
              <div className="text-primary/20 mb-4">
                <FaQuoteLeft className="text-4xl" />
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-sm ${
                      star <= (review.ratingPoint || 0)
                        ? "text-warning fill-warning"
                        : "text-base-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-neutral">
                  {review.ratingPoint || 0}/5
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-neutral mb-6 grow leading-relaxed">
                {review.reviewComment || "Great experience!"}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-base-300">
                <div className="avatar placeholder">
                  <div className="bg-linear-to-r from-primary to-secondary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    <span>{getUserInitials(review.email)}</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-base-content">
                    {getUserDisplayName(review.email)}
                  </p>
                  {review.createdAt && (
                    <p className="text-sm text-neutral">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
