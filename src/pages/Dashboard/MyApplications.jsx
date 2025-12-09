// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaCcAmazonPay, FaStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Loader from "../../components/Loader";
import { useState } from "react";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    data: applications = [], // Default to empty array
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`applications?email=${user.email}`);
      // Handle array response
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email, // Only run if user email exists
  });

  // Mutation for deleting scholarship application
  const deleteApplicationMutation = useMutation({
    mutationFn: async (applicationId) => {
      const res = await axiosSecure.delete(`/applications/${applicationId}`);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the applications query after successful deletion
      queryClient.invalidateQueries({
        queryKey: ["myApplications", user?.email],
      });
      console.log("Application deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting application:", error);
    },
  });

  const handleApplicationDelete = (application) => {
    deleteApplicationMutation.mutate(application._id);
  };

  // Mutation for adding review
  const addReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      console.log("Review added successfully");
    },
    onError: (error) => {
      console.error("Error adding review:", error);
    },
  });

  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedApplicationForReview, setSelectedApplicationForReview] =
    useState(null);
  const [ratingPoint, setRatingPoint] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const { data: singleApplication, isLoading: isLoadingApplication } = useQuery(
    {
      queryKey: ["application", selectedId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/applications/${selectedId}`);
        return res.data;
      },
      enabled: !!selectedId, // run only when ID exists
    }
  );

  const handleApplicationView = (application) => {
    setSelectedId(application._id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleAddReview = (application) => {
    setSelectedApplicationForReview(application);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedApplicationForReview(null);
    setRatingPoint(0);
    setReviewComment("");
  };

  const handleSubmitReview = () => {
    if (
      !selectedApplicationForReview ||
      ratingPoint === 0 ||
      !reviewComment.trim()
    ) {
      return;
    }

    const { scholarshipId, universityName } = selectedApplicationForReview;
    const { displayName, email, photoURL } = user;

    const reviewData = {
      scholarshipId,
      universityName,
      displayName,
      email,
      imageURL: photoURL,
      ratingPoint,
      reviewComment,
    };

    addReviewMutation.mutate(reviewData, {
      onSuccess: () => {
        handleCloseReviewModal();
      },
    });
  };

  const handlePayment = async (application) => {
    try {
      const paymentInfo = {
        applicationFee: application.applicationFee,
        id: application._id,
        email: user.email,
        scholarshipName: application.scholarshipName,
      };

      const res = await axiosSecure.post(
        "/create-checkout-sessions",
        paymentInfo
      );

      if (res.data?.url) {
        // Use window.location.replace for payment redirect
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error("Payment error:", error);
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
          <p className="text-error text-lg">
            Error loading applications: {error?.message || "Unknown error"}
          </p>
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
            My Applications
          </h1>
          <p className="text-neutral text-lg">
            Manage and track your scholarship applications
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
                    University Name
                  </th>
                  <th className="text-primary font-semibold hidden md:table-cell">
                    Address
                  </th>
                  <th className="text-primary font-semibold hidden lg:table-cell">
                    Category
                  </th>
                  <th className="text-primary font-semibold">
                    Application Fee
                  </th>
                  <th className="text-primary font-semibold">Payment Status</th>
                  <th className="text-primary font-semibold">Enroll Status</th>
                  <th className="text-primary font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications && applications.length > 0 ? (
                  applications.map((application, index) => {
                    const paymentStatus = application.paymentStatus || "N/A";
                    const enrollStatus = application.enrollmentStatus || "N/A";

                    return (
                      <motion.tr
                        key={application._id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-base-200 transition-colors border-b border-base-300"
                      >
                        <th className="text-neutral font-medium">
                          {index + 1}
                        </th>
                        <td>
                          <div className="font-semibold text-primary">
                            {application.universityName}
                          </div>
                          <div className="text-sm text-neutral md:hidden">
                            {application.city}, {application.country}
                          </div>
                          <div className="text-sm text-neutral md:hidden">
                            {application.scholarshipCategory}
                          </div>
                        </td>
                        <td className="hidden md:table-cell text-neutral">
                          {application.city}, {application.country}
                        </td>
                        <td className="hidden lg:table-cell">
                          <span className="badge badge-primary badge-sm">
                            {application.scholarshipCategory}
                          </span>
                        </td>
                        <td className="text-neutral font-medium">
                          ${application.applicationFee || "N/A"}
                        </td>
                        <td>
                          <span
                            className={`badge font-semibold ${
                              paymentStatus === "paid"
                                ? "badge-success text-white"
                                : paymentStatus === "unpaid"
                                ? "badge-error text-white"
                                : "badge-neutral"
                            }`}
                          >
                            {paymentStatus.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge font-semibold ${
                              enrollStatus === "enrolled"
                                ? "badge-success text-white"
                                : enrollStatus === "unenrolled"
                                ? "badge-error text-white"
                                : enrollStatus === "pending"
                                ? "badge-warning text-white"
                                : "badge-neutral"
                            }`}
                          >
                            {enrollStatus.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-2 flex-wrap">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleApplicationView(application)}
                              className="btn btn-sm btn-circle btn-ghost text-primary hover:bg-primary hover:text-primary-content"
                              title="View Details"
                            >
                              <FaEye className="text-lg" />
                            </motion.button>
                            {paymentStatus === "unpaid" && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlePayment(application)}
                                className="btn btn-sm btn-circle btn-ghost text-accent hover:bg-accent hover:text-accent-content"
                                title="Pay Now"
                              >
                                <FaCcAmazonPay className="text-lg" />
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() =>
                                handleApplicationDelete(application)
                              }
                              whileTap={{ scale: 0.9 }}
                              className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error hover:text-error-content"
                              title="Delete"
                            >
                              <MdDeleteForever className="text-lg" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleAddReview(application)}
                              whileTap={{ scale: 0.9 }}
                              className="btn btn-sm btn-circle btn-ghost text-primary hover:bg-primary hover:text-primary-content"
                              title="Review"
                            >
                              <MdOutlineRateReview className="text-lg" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-neutral text-lg font-medium">
                          No applications found
                        </p>
                        <p className="text-neutral/70 text-sm">
                          Start applying to scholarships to see them here
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

      {/* Application Details Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl w-full bg-base-100 shadow-2xl border border-base-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-base-300">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-primary"
              >
                Application Details
              </motion.h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error hover:text-error-content"
              >
                <IoMdClose className="text-xl" />
              </motion.button>
            </div>

            {/* Modal Content */}
            {isLoadingApplication ? (
              <div className="flex justify-center items-center py-12">
                <Loader />
              </div>
            ) : singleApplication ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Scholarship Name & University */}
                <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-box p-6 border border-primary/20">
                  <h4 className="text-2xl font-bold text-primary mb-2">
                    {singleApplication.scholarshipName || "N/A"}
                  </h4>
                  <p className="text-lg text-neutral font-semibold">
                    {singleApplication.universityName || "N/A"}
                  </p>
                </div>

                {/* Main Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Application Fee */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-base-200 rounded-box p-4 border border-base-300"
                  >
                    <p className="text-sm text-neutral/70 mb-1">
                      Application Fee
                    </p>
                    <p className="text-xl font-bold text-primary">
                      ${singleApplication.applicationFee || "N/A"}
                    </p>
                  </motion.div>

                  {/* Degree */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-base-200 rounded-box p-4 border border-base-300"
                  >
                    <p className="text-sm text-neutral/70 mb-1">Degree</p>
                    <p className="text-xl font-bold text-secondary">
                      {singleApplication.degree || "N/A"}
                    </p>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-base-200 rounded-box p-4 border border-base-300"
                  >
                    <p className="text-sm text-neutral/70 mb-1">Location</p>
                    <p className="text-lg font-semibold text-neutral">
                      {singleApplication.city || "N/A"},{" "}
                      {singleApplication.country || "N/A"}
                    </p>
                  </motion.div>

                  {/* Scholarship Category */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-base-200 rounded-box p-4 border border-base-300"
                  >
                    <p className="text-sm text-neutral/70 mb-1">Category</p>
                    <span className="badge badge-primary badge-lg">
                      {singleApplication.scholarshipCategory || "N/A"}
                    </span>
                  </motion.div>

                  {/* Payment Status */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-base-200 rounded-box p-4 border border-base-300"
                  >
                    <p className="text-sm text-neutral/70 mb-2">
                      Payment Status
                    </p>
                    <span
                      className={`badge badge-lg font-semibold ${
                        singleApplication.paymentStatus === "paid"
                          ? "badge-success text-white"
                          : singleApplication.paymentStatus === "unpaid"
                          ? "badge-error text-white"
                          : "badge-neutral"
                      }`}
                    >
                      {(singleApplication.paymentStatus || "N/A").toUpperCase()}
                    </span>
                  </motion.div>

                  {/* Enrollment Status */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-base-200 rounded-box p-4 border border-base-300"
                  >
                    <p className="text-sm text-neutral/70 mb-2">
                      Enrollment Status
                    </p>
                    <span
                      className={`badge badge-lg font-semibold ${
                        singleApplication.enrollmentStatus === "enrolled"
                          ? "badge-success text-white"
                          : singleApplication.enrollmentStatus === "unenrolled"
                          ? "badge-error text-white"
                          : singleApplication.enrollmentStatus === "pending"
                          ? "badge-warning text-white"
                          : "badge-neutral"
                      }`}
                    >
                      {(
                        singleApplication.enrollmentStatus || "N/A"
                      ).toUpperCase()}
                    </span>
                  </motion.div>

                  {/* Created At */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-base-200 rounded-box p-4 border border-base-300 md:col-span-2"
                  >
                    <p className="text-sm text-neutral/70 mb-1">
                      Application Date
                    </p>
                    <p className="text-lg font-semibold text-neutral">
                      {singleApplication.createdAt
                        ? new Date(
                            singleApplication.createdAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </motion.div>
                </div>

                {/* Feedback Section */}
                {singleApplication.feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-accent/10 rounded-box p-6 border border-accent/20"
                  >
                    <p className="text-sm text-neutral/70 mb-2 font-semibold">
                      Feedback
                    </p>
                    <p className="text-base text-neutral leading-relaxed">
                      {singleApplication.feedback}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-error text-lg">
                  Failed to load application details
                </p>
              </div>
            )}

            {/* Modal Footer */}
            <div className="modal-action mt-6 pt-4 border-t border-base-300">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseModal}
                className="btn btn-primary"
              >
                Close
              </motion.button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleCloseModal}></div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl w-full bg-base-100 shadow-2xl border border-base-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-base-300">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-primary"
              >
                Add Review
              </motion.h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseReviewModal}
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
              {selectedApplicationForReview && (
                <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-box p-4 border border-primary/20">
                  <p className="text-sm text-neutral/70 mb-1">University</p>
                  <p className="text-lg font-semibold text-primary">
                    {selectedApplicationForReview.universityName || "N/A"}
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
                      onClick={() => setRatingPoint(star)}
                      className={`transition-colors ${
                        star <= ratingPoint ? "text-warning" : "text-base-300"
                      }`}
                    >
                      <FaStar className="text-3xl cursor-pointer" />
                    </motion.button>
                  ))}
                  {ratingPoint > 0 && (
                    <span className="ml-2 text-neutral font-semibold">
                      ({ratingPoint}/5)
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
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write your review here..."
                  className="textarea textarea-bordered w-full h-32 resize-none focus:outline-none focus:border-primary"
                  rows="5"
                />
                <p className="text-xs text-neutral/70">
                  {reviewComment.length} characters
                </p>
              </div>
            </motion.div>

            {/* Modal Footer */}
            <div className="modal-action mt-6 pt-4 border-t border-base-300">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseReviewModal}
                className="btn btn-ghost"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitReview}
                disabled={
                  ratingPoint === 0 ||
                  !reviewComment.trim() ||
                  addReviewMutation.isPending
                }
                className="btn btn-primary"
              >
                {addReviewMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </motion.button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={handleCloseReviewModal}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
