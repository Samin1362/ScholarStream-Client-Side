// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "./ScholarshipCard";

const ScholarshipCards = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const {
    data: scholarships = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  // Filter and sort scholarships
  const filteredAndSortedScholarships = useMemo(() => {
    let filtered = scholarships;

    // Apply search filter
    if (searchTerm) {
      filtered = scholarships.filter(
        (scholarship) =>
          scholarship.scholarshipName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.universityName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.country
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.subjectCategory
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.scholarshipCategory
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting by tuition fees
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const feesA = parseFloat(a.tuitionFees?.replace(/[^0-9.-]+/g, "")) || 0;
        const feesB = parseFloat(b.tuitionFees?.replace(/[^0-9.-]+/g, "")) || 0;

        if (sortOrder === "lowToHigh") {
          return feesA - feesB;
        } else if (sortOrder === "highToLow") {
          return feesB - feesA;
        }
        return 0;
      });
    }

    return filtered;
  }, [scholarships, searchTerm, sortOrder]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-error text-lg">
              Error loading scholarships: {error?.message || "Unknown error"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            All Scholarships
          </h1>
          <p className="text-neutral text-lg">
            Discover {filteredAndSortedScholarships.length} scholarship
            opportunities
          </p>
        </motion.div>

        {/* Search and Sort Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full">
                <label className="label">
                  <span className="label-text font-medium text-neutral mb-2">
                    Search Scholarships
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, university, location, category..."
                    className="input input-bordered w-full focus:input-primary pl-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="w-full md:w-64">
                <label className="label">
                  <span className="label-text font-medium text-neutral mb-2">
                    Sort by Tuition Fees
                  </span>
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="select select-bordered w-full focus:select-primary"
                >
                  <option value="">Default</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-neutral"
              >
                Found {filteredAndSortedScholarships.length} result
                {filteredAndSortedScholarships.length !== 1 ? "s" : ""} for "
                {searchTerm}"
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Cards Grid */}
        {filteredAndSortedScholarships.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-base-100 rounded-box p-8 shadow-lg border border-base-300 max-w-md mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-neutral mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-xl font-semibold text-neutral mb-2">
                {searchTerm
                  ? "No Scholarships Found"
                  : "No Scholarships Available"}
              </h3>
              <p className="text-neutral/70">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Check back later for new opportunities"}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ScholarshipCard scholarship={scholarship} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipCards;
