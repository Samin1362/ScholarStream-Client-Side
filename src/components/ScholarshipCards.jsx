// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "./ScholarshipCard";
import SkeletonCard from "./SkeletonCard";
import useAuth from "../hooks/useAuth";

const ScholarshipCards = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showMyApplications, setShowMyApplications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 8; // 4 columns × 2 rows = 8 cards per page

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  // Build query parameters for API
  const queryParams = useMemo(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (countryFilter) params.country = countryFilter;
    if (showMyApplications && user?.email) params.email = user.email;
    return params;
  }, [searchTerm, countryFilter, showMyApplications, user]);

  // Get unique countries for filter dropdown
  const { data: allScholarships = [], isLoading: isLoadingCountries } =
    useQuery({
      queryKey: ["all-scholarships-for-countries"],
      queryFn: async () => {
        const res = await axiosSecure.get("/scholarships");
        return res.data;
      },
    });

  const uniqueCountries = useMemo(() => {
    const countries = new Set();
    allScholarships.forEach((scholarship) => {
      if (scholarship.country) {
        countries.add(scholarship.country);
      }
    });
    return Array.from(countries).sort();
  }, [allScholarships]);

  // Fetch scholarships with filters
  const {
    data: scholarships = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["scholarships", queryParams],
    queryFn: async () => {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString
        ? `/scholarships?${queryString}`
        : "/scholarships";
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  // Apply sorting by tuition fees (client-side)
  const sortedScholarships = useMemo(() => {
    if (!sortOrder) return scholarships;

    return [...scholarships].sort((a, b) => {
      const feesA = parseFloat(a.tuitionFees?.replace(/[^0-9.-]+/g, "")) || 0;
      const feesB = parseFloat(b.tuitionFees?.replace(/[^0-9.-]+/g, "")) || 0;

      if (sortOrder === "lowToHigh") {
        return feesA - feesB;
      } else if (sortOrder === "highToLow") {
        return feesB - feesA;
      }
      return 0;
    });
  }, [scholarships, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedScholarships.length / scholarshipsPerPage);
  const startIndex = (currentPage - 1) * scholarshipsPerPage;
  const endIndex = startIndex + scholarshipsPerPage;
  const paginatedScholarships = sortedScholarships.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  if (isLoading || isLoadingCountries) {
    return (
      <div className="min-h-screen bg-base-200 py-8 px-4">
        <div className="container mx-auto">
          {/* Header Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <div className="h-12 w-64 bg-base-300 rounded mx-auto mb-3 animate-pulse"></div>
            <div className="h-6 w-96 bg-base-300 rounded mx-auto animate-pulse"></div>
          </motion.div>

          {/* Filter Section Skeleton */}
          <div className="mb-8">
            <div className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 space-y-2">
                  <div className="h-4 w-32 bg-base-300 rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-base-300 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-base-300 rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-base-300 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-base-300 rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-base-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton Cards Grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
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
            Discover {sortedScholarships.length} scholarship opportunities
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300">
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {/* Search Bar */}
              <div className="lg:col-span-2">
                <label className="label">
                  <span className="label-text font-medium text-neutral mb-2">
                    Search Scholarships
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search by name, university, or degree..."
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
                    {searchInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchInput("");
                          setSearchTerm("");
                          setCurrentPage(1);
                        }}
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
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary text-white self-end"
                  >
                    Search
                  </motion.button>
                </div>
              </div>

              {/* Country Filter */}
              <div>
                <label className="label">
                  <span className="label-text font-medium text-neutral mb-2">
                    Filter by Country
                  </span>
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => {
                    setCountryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="select select-bordered w-full focus:select-primary"
                >
                  <option value="">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div>
                <label className="label">
                  <span className="label-text font-medium text-neutral mb-2">
                    Sort by Tuition Fees
                  </span>
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="select select-bordered w-full focus:select-primary"
                >
                  <option value="">Default</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>
            </form>

            {/* My Applications Toggle */}
            {user && (
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showMyApplications}
                  onChange={(e) => {
                    setShowMyApplications(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="checkbox checkbox-primary"
                />
                <label className="label cursor-pointer">
                  <span className="label-text text-neutral">
                    Show only my applied scholarships
                  </span>
                </label>
              </div>
            )}

            {/* Results Count */}
            {(searchTerm || countryFilter || showMyApplications) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-neutral"
              >
                Found {sortedScholarships.length} result
                {sortedScholarships.length !== 1 ? "s" : ""}
                {searchTerm && ` for "${searchTerm}"`}
                {countryFilter && ` in ${countryFilter}`}
                {showMyApplications && " (My Applications)"}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Cards Grid */}
        {sortedScholarships.length === 0 ? (
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
          <>
            {/* Cards Grid - 4 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paginatedScholarships.map((scholarship, index) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 mt-8"
              >
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <motion.button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                    className={`btn ${
                      currentPage === 1
                        ? "btn-disabled"
                        : "btn-primary text-white"
                    }`}
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1);

                        if (!showPage) {
                          // Show ellipsis
                          if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2 text-neutral">
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <motion.button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`btn ${
                              currentPage === page
                                ? "btn-primary text-white"
                                : "btn-ghost"
                            } min-w-12`}
                          >
                            {page}
                          </motion.button>
                        );
                      }
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    whileHover={{
                      scale: currentPage === totalPages ? 1 : 1.05,
                    }}
                    whileTap={{
                      scale: currentPage === totalPages ? 1 : 0.95,
                    }}
                    className={`btn ${
                      currentPage === totalPages
                        ? "btn-disabled"
                        : "btn-primary text-white"
                    }`}
                  >
                    Next
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Page Info */}
                <p className="text-sm text-neutral">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, sortedScholarships.length)} of{" "}
                  {sortedScholarships.length} scholarships
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScholarshipCards;
