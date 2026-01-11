// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FaUniversity, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import SkeletonCard from "./SkeletonCard";

const TopUniversities = () => {
  const axiosPublic = useAxiosPublic();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-universities-scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Get top universities by world rank
  const topUniversities = useMemo(() => {
    if (!scholarships || scholarships.length === 0) return [];

    // Filter scholarships with world rank and group by university
    const universityMap = new Map();

    scholarships.forEach((scholarship) => {
      if (scholarship.worldRank && scholarship.universityName) {
        const rank = parseInt(scholarship.worldRank);
        if (!isNaN(rank)) {
          const existing = universityMap.get(scholarship.universityName);
          if (!existing || rank < parseInt(existing.worldRank)) {
            universityMap.set(scholarship.universityName, scholarship);
          }
        }
      }
    });

    // Convert to array and sort by world rank
    const universities = Array.from(universityMap.values())
      .sort((a, b) => parseInt(a.worldRank) - parseInt(b.worldRank))
      .slice(0, 6); // Top 6 universities

    return universities;
  }, [scholarships]);

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
            <div className="h-12 w-96 bg-base-300 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-[500px] max-w-full bg-base-300 rounded mx-auto animate-pulse"></div>
          </motion.div>

          {/* Skeleton Universities Grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="text-center mt-12">
            <div className="h-14 w-72 bg-base-300 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (topUniversities.length === 0) {
    return null; // Don't show section if no data
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
            Top Ranked Universities
          </h2>
          <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
            Explore scholarship opportunities from world-leading institutions
          </p>
        </motion.div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topUniversities.map((university, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link to="/allScholarships">
                <div className="bg-base-200 rounded-box overflow-hidden shadow-lg border border-base-300 hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        university.image ||
                        "https://via.placeholder.com/400x200?text=University"
                      }
                      alt={university.universityName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                    {/* World Rank Badge */}
                    <div className="absolute top-4 right-4 bg-warning text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg">
                      <FaTrophy />
                      <span>#{university.worldRank}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* University Icon */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <FaUniversity className="text-lg" />
                      </div>
                      <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {university.universityName}
                      </h3>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-neutral mb-4">
                      <FaMapMarkerAlt className="text-primary" />
                      <span className="text-sm">
                        {university.city}, {university.country}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      {university.scholarshipCategory && (
                        <div className="badge badge-primary badge-sm">
                          {university.scholarshipCategory}
                        </div>
                      )}
                      {university.degree && (
                        <div className="badge badge-secondary badge-sm ml-2">
                          {university.degree}
                        </div>
                      )}
                    </div>

                    {/* View Button */}
                    <div className="flex items-center text-primary group-hover:text-secondary transition-colors">
                      <span className="text-sm font-semibold mr-2">
                        View Scholarships
                      </span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/allScholarships">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg text-white px-10"
            >
              Explore All Universities
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopUniversities;
