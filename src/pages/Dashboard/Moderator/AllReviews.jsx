// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import Loader from "../../../components/Loader";
import { useNotification } from "../../../components/Notification";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { success, error } = useNotification();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("reviews");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Mutation for deleting review
  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId) => {
      const res = await axiosSecure.delete(`/reviews/${reviewId}`);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the reviews query after successful deletion
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      success("Review deleted successfully!");
    },
    onError: (err) => {
      error(
        err?.response?.data?.message ||
          "Failed to delete review. Please try again."
      );
    },
  });

  const handleDelete = (review) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(review._id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4 flex justify-center items-center">
        <div className="text-center">
          <p className="text-error text-lg">Error loading reviews</p>
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
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            All Reviews
          </h1>
          <p className="text-neutral text-lg">
            Manage and moderate all scholarship reviews
          </p>
        </motion.div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-base-100 rounded-box shadow-xl border border-base-300 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Table Header */}
              <thead className="bg-base-200">
                <tr>
                  <th className="text-primary font-semibold">#</th>
                  <th className="text-primary font-semibold">Applicant Name</th>
                  <th className="text-primary font-semibold hidden md:table-cell">
                    Applicant Email
                  </th>
                  <th className="text-primary font-semibold">
                    University Name
                  </th>
                  <th className="text-primary font-semibold">Rating</th>
                  <th className="text-primary font-semibold hidden lg:table-cell">
                    Review Comment
                  </th>
                  <th className="text-primary font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <motion.tr
                      key={review._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-base-200 transition-colors border-b border-base-300"
                    >
                      <th className="text-neutral font-medium">{index + 1}</th>
                      <td>
                        <div className="font-semibold text-primary">
                          {review.displayName || "N/A"}
                        </div>
                        <div className="text-sm text-neutral md:hidden">
                          {review.email || "N/A"}
                        </div>
                      </td>
                      <td className="hidden md:table-cell text-neutral">
                        {review.email || "N/A"}
                      </td>
                      <td className="text-neutral">
                        <div className="font-medium">
                          {review.universityName || "N/A"}
                        </div>
                        <div className="text-sm text-neutral lg:hidden mt-1 truncate max-w-xs">
                          {review.reviewComment || "N/A"}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1 flex-wrap">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`text-xs md:text-sm ${
                                  star <= (review.ratingPoint || 0)
                                    ? "text-warning fill-warning"
                                    : "text-base-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-neutral font-medium text-xs md:text-sm">
                            ({review.ratingPoint || "N/A"}/5)
                          </span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell text-neutral max-w-xs">
                        <div
                          className="truncate"
                          title={review.reviewComment || "N/A"}
                        >
                          {review.reviewComment || "N/A"}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(review)}
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error hover:text-error-content"
                            title="Delete Review"
                            disabled={deleteReviewMutation.isPending}
                          >
                            {deleteReviewMutation.isPending ? (
                              <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                              <FaTrashAlt className="text-lg" />
                            )}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-neutral/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        <p className="text-neutral text-lg font-medium">
                          No reviews found
                        </p>
                        <p className="text-neutral/70 text-sm">
                          Reviews will appear here once users submit them
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AllReviews;
