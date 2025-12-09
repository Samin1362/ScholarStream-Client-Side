import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Loader from "../../components/Loader";

// Component for each review row that fetches its scholarship data
const ReviewRow = ({ review, index, onDelete, onEdit }) => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarship, isLoading: isLoadingScholarship } = useQuery({
    queryKey: ["scholarship", review.scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships/${review.scholarshipId}`
      );
      return res.data;
    },
    enabled: !!review.scholarshipId,
  });

  const { reviewComment, ratingPoint, createdAt } = review;
  const scholarshipName = scholarship?.scholarshipName || "Loading...";

  const handleDeleteReview = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      onDelete(review._id);
    }
  };

  const handleEditReview = () => {
    onEdit(review);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="hover:bg-base-200 transition-colors border-b border-base-300"
    >
      <th className="text-neutral font-medium">{index + 1}</th>
      <td>
        {isLoadingScholarship ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <div className="font-semibold text-primary">{scholarshipName}</div>
        )}
      </td>
      <td className="text-neutral">
        <div className="font-medium">{review.universityName || "N/A"}</div>
        <div className="text-sm text-neutral lg:hidden mt-1 truncate max-w-xs">
          {reviewComment || "N/A"}
        </div>
        <div className="text-xs text-neutral/70 md:hidden mt-1">
          {createdAt
            ? new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </div>
      </td>
      <td className="text-neutral hidden lg:table-cell max-w-xs">
        <div className="truncate" title={reviewComment || "N/A"}>
          {reviewComment || "N/A"}
        </div>
      </td>
      <td className="text-neutral hidden md:table-cell">
        {createdAt
          ? new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "N/A"}
      </td>
      <td>
        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-xs md:text-sm ${
                  star <= (ratingPoint || 0)
                    ? "text-warning fill-warning"
                    : "text-base-300"
                }`}
              />
            ))}
          </div>
          <span className="text-neutral font-medium text-xs md:text-sm">
            ({ratingPoint || "N/A"}/5)
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleEditReview}
            whileTap={{ scale: 0.9 }}
            className="btn btn-sm btn-circle btn-ghost text-secondary hover:bg-secondary hover:text-secondary-content"
            title="Edit Review"
          >
            <CiEdit className="text-lg" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleDeleteReview}
            whileTap={{ scale: 0.9 }}
            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error hover:text-error-content"
            title="Delete Review"
          >
            <FaTrashAlt className="text-lg" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: reviews = [], // Default to empty array
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      // Handle array response
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email,
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
        queryKey: ["reviews", user?.email],
      });
      console.log("Review deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
    },
  });

  const handleDeleteReview = (reviewId) => {
    deleteReviewMutation.mutate(reviewId);
  };

  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReviewForEdit, setSelectedReviewForEdit] = useState(null);
  const [editRatingPoint, setEditRatingPoint] = useState(0);
  const [editReviewComment, setEditReviewComment] = useState("");

  // Mutation for updating review
  const updateReviewMutation = useMutation({
    mutationFn: async ({ reviewId, ratingPoint, reviewComment }) => {
      const res = await axiosSecure.patch(`/reviews/${reviewId}`, {
        ratingPoint,
        reviewComment,
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the reviews query after successful update
      queryClient.invalidateQueries({
        queryKey: ["reviews", user?.email],
      });
      handleCloseEditModal();
      console.log("Review updated successfully");
    },
    onError: (error) => {
      console.error("Error updating review:", error);
    },
  });

  const handleEditReview = (review) => {
    setSelectedReviewForEdit(review);
    setEditRatingPoint(review.ratingPoint || 0);
    setEditReviewComment(review.reviewComment || "");
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedReviewForEdit(null);
    setEditRatingPoint(0);
    setEditReviewComment("");
  };

  const handleSubmitEditReview = () => {
    if (
      !selectedReviewForEdit ||
      editRatingPoint === 0 ||
      !editReviewComment.trim()
    ) {
      return;
    }

    updateReviewMutation.mutate({
      reviewId: selectedReviewForEdit._id,
      ratingPoint: editRatingPoint,
      reviewComment: editReviewComment,
    });
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
            My Reviews
          </h1>
          <p className="text-neutral text-lg">
            View and manage your scholarship reviews
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
                  <th className="text-primary font-semibold">
                    Scholarship Name
                  </th>
                  <th className="text-primary font-semibold">
                    University Name
                  </th>
                  <th className="text-primary font-semibold hidden lg:table-cell">
                    Review Comment
                  </th>
                  <th className="text-primary font-semibold hidden md:table-cell">
                    Review Date
                  </th>
                  <th className="text-primary font-semibold">Rating</th>
                  <th className="text-primary font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <ReviewRow
                      key={review._id || index}
                      review={review}
                      index={index}
                      onDelete={handleDeleteReview}
                      onEdit={handleEditReview}
                    />
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
                          Start reviewing scholarships to see them here
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

      {/* Edit Review Modal */}
      {isEditModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl w-full bg-base-100 shadow-2xl border border-base-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-base-300">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-primary"
              >
                Edit Review
              </motion.h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseEditModal}
                className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error hover:text-error-content"
              >
                <IoMdClose className="text-xl" />
              </motion.button>
            </div>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* University Name */}
              {selectedReviewForEdit && (
                <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-box p-4 border border-primary/20">
                  <p className="text-sm text-neutral/70 mb-1">University</p>
                  <p className="text-lg font-semibold text-primary">
                    {selectedReviewForEdit?.universityName || "N/A"}
                  </p>
                </div>
              )}

              {/* Rating Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-neutral">
                  Rating <span className="text-error">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditRatingPoint(star)}
                      className={`transition-colors ${
                        star <= editRatingPoint
                          ? "text-warning"
                          : "text-base-300"
                      }`}
                    >
                      <FaStar className="text-3xl cursor-pointer" />
                    </motion.button>
                  ))}
                  {editRatingPoint > 0 && (
                    <span className="ml-2 text-neutral font-semibold">
                      ({editRatingPoint}/5)
                    </span>
                  )}
                </div>
              </div>

              {/* Review Comment Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-neutral">
                  Review Comment <span className="text-error">*</span>
                </label>
                <textarea
                  value={editReviewComment}
                  onChange={(e) => setEditReviewComment(e.target.value)}
                  placeholder="Write your review here..."
                  className="textarea textarea-bordered w-full h-32 resize-none focus:outline-none focus:border-primary"
                  rows="5"
                />
                <p className="text-xs text-neutral/70">
                  {editReviewComment.length} characters
                </p>
              </div>
            </motion.div>

            {/* Modal Footer */}
            <div className="modal-action mt-6 pt-4 border-t border-base-300">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseEditModal}
                className="btn btn-ghost"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitEditReview}
                disabled={
                  editRatingPoint === 0 ||
                  !editReviewComment.trim() ||
                  updateReviewMutation.isPending
                }
                className="btn btn-primary"
              >
                {updateReviewMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Update Review"
                )}
              </motion.button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleCloseEditModal}></div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
