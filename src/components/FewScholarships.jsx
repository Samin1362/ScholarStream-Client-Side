import React, { useMemo } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import ScholarshipCard from "./ScholarshipCard";
import SkeletonCard from "./SkeletonCard";

const FewScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: scholarships = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships");
      return res.data;
    },
  });

  // Filter and sort scholarships by lowest application fees or most recent post date, then take top 6
  const topScholarships = useMemo(() => {
    if (!scholarships || scholarships.length === 0) return [];

    // Sort by application fees (lowest first), then by most recent post date
    const sorted = [...scholarships].sort((a, b) => {
      // Extract numeric value from application fees string
      const appFeesA =
        parseFloat(a.applicationFee?.replace(/[^0-9.-]+/g, "")) || Infinity;
      const appFeesB =
        parseFloat(b.applicationFee?.replace(/[^0-9.-]+/g, "")) || Infinity;

      // If application fees are equal, sort by most recent post date (createdAt)
      if (appFeesA === appFeesB) {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Most recent first
      }

      return appFeesA - appFeesB; // Lowest application fee first
    });

    // Return top 6 scholarships with lowest application fees or most recent
    return sorted.slice(0, 6);
  }, [scholarships]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-base-200">
        <div className="container mx-auto">
          {/* Header Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="h-12 w-96 bg-base-300 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-[500px] max-w-full bg-base-300 rounded mx-auto animate-pulse"></div>
          </motion.div>

          {/* Skeleton Cards Grid - 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="text-center">
            <div className="h-14 w-64 bg-base-300 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[400px] bg-base-200 py-12 px-4 flex justify-center items-center">
        <div className="text-center">
          <p className="text-error text-lg">
            Error loading scholarships: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  if (!topScholarships || topScholarships.length === 0) {
    return (
      <div className="min-h-[400px] bg-base-200 py-12 px-4 flex justify-center items-center">
        <div className="text-center">
          <p className="text-neutral text-lg">No scholarships available</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-base-200">
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
            Featured Scholarships
          </h2>
          <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
            Discover our top scholarship opportunities with the lowest
            application fees and most recent postings
          </p>
        </motion.div>

        {/* Scholarships Grid - 4 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topScholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ScholarshipCard scholarship={scholarship} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/allScholarships">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              View All Scholarships
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FewScholarships;
