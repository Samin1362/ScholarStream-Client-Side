import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";
import { FaEye, FaCommentAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Loader from "../../../components/Loader";

const ManageAppliedApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("applications");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // State for feedback modal
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Mutation for updating application
  const updateApplicationMutation = useMutation({
    mutationFn: async ({ applicationId, feedback, enrollmentStatus }) => {
      const updateData = {};
      if (feedback) updateData.feedback = feedback;
      if (enrollmentStatus) updateData.enrollmentStatus = enrollmentStatus;

      const res = await axiosSecure.patch(
        `/applications/${applicationId}`,
        updateData
      );
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the applications query after successful update
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      handleCloseFeedbackModal();
      console.log("Application updated successfully");
    },
    onError: (error) => {
      console.error("Error updating application:", error);
    },
  });

  const handleOpenFeedbackModal = (application) => {
    setSelectedApplication(application);
    setFeedback(application.feedback || "");
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setSelectedApplication(null);
    setFeedback("");
  };

  const handleSubmitFeedback = () => {
    if (!selectedApplication || !feedback.trim()) return;

    updateApplicationMutation.mutate({
      applicationId: selectedApplication._id,
      feedback: feedback.trim(),
    });
  };

  const handleStatusUpdate = (application, newStatus) => {
    if (!application || !newStatus) return;

    updateApplicationMutation.mutate({
      applicationId: application._id,
      enrollmentStatus: newStatus,
    });
  };

  const handleCancelApplication = (application) => {
    if (!application) return;

    if (window.confirm("Are you sure you want to reject this application?")) {
      updateApplicationMutation.mutate({
        applicationId: application._id,
        enrollmentStatus: "rejected",
      });
    }
  };

  const handleViewDetails = (application) => {
    // You can implement details modal or navigation here
    console.log("View details for:", application);
    // For now, just show an alert with details
    alert(
      `Application Details:\n\nApplicant: ${application.userName}\nEmail: ${application.userEmail}\nUniversity: ${application.universityName}\nStatus: ${application.enrollmentStatus}\nPayment: ${application.paymentStatus}`
    );
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
          <p className="text-error text-lg">Error loading applications</p>
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
            Manage Applications
          </h1>
          <p className="text-neutral text-lg">
            Review and manage scholarship applications
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
                  <th className="text-primary font-semibold hidden lg:table-cell">
                    Feedback
                  </th>
                  <th className="text-primary font-semibold">Status</th>
                  <th className="text-primary font-semibold">Payment</th>
                  <th className="text-primary font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications && applications.length > 0 ? (
                  applications.map((application, index) => (
                    <motion.tr
                      key={application._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-base-200 transition-colors border-b border-base-300"
                    >
                      <th className="text-neutral font-medium">{index + 1}</th>
                      <td>
                        <div className="font-semibold text-primary">
                          {application.userName || "N/A"}
                        </div>
                        <div className="text-sm text-neutral md:hidden">
                          {application.userEmail || "N/A"}
                        </div>
                      </td>
                      <td className="hidden md:table-cell text-neutral">
                        {application.userEmail || "N/A"}
                      </td>
                      <td className="text-neutral">
                        <div className="font-medium">
                          {application.universityName || "N/A"}
                        </div>
                        <div className="text-sm text-neutral lg:hidden mt-1 truncate max-w-xs">
                          {application.feedback || "No feedback"}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell text-neutral max-w-xs">
                        <div
                          className="truncate"
                          title={application.feedback || "No feedback"}
                        >
                          {application.feedback || "No feedback"}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge font-semibold ${
                            application.enrollmentStatus === "enrolled"
                              ? "badge-success text-white"
                              : application.enrollmentStatus === "rejected"
                              ? "badge-error text-white"
                              : application.enrollmentStatus === "processing"
                              ? "badge-warning text-white"
                              : "badge-neutral"
                          }`}
                        >
                          {(
                            application.enrollmentStatus || "pending"
                          ).toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge font-semibold ${
                            application.paymentStatus === "paid"
                              ? "badge-success text-white"
                              : application.paymentStatus === "unpaid"
                              ? "badge-error text-white"
                              : "badge-neutral"
                          }`}
                        >
                          {(application.paymentStatus || "N/A").toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          {/* Details Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleViewDetails(application)}
                            className="btn btn-sm btn-circle btn-ghost text-primary hover:bg-primary hover:text-primary-content"
                            title="View Details"
                          >
                            <FaEye className="text-lg" />
                          </motion.button>

                          {/* Feedback Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleOpenFeedbackModal(application)}
                            className="btn btn-sm btn-circle btn-ghost text-secondary hover:bg-secondary hover:text-secondary-content"
                            title="Feedback"
                          >
                            <FaCommentAlt className="text-lg" />
                          </motion.button>

                          {/* Status Update Dropdown */}
                          <div className="dropdown dropdown-end">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              tabIndex={0}
                              role="button"
                              className="btn btn-sm btn-circle btn-ghost text-accent hover:bg-accent hover:text-accent-content"
                              title="Status Update"
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
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>
                            </motion.div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300"
                            >
                              <li>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(
                                      application,
                                      "processing"
                                    )
                                  }
                                  className="text-warning hover:bg-warning/10"
                                >
                                  Processing
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(application, "completed")
                                  }
                                  className="text-success hover:bg-success/10"
                                >
                                  Completed
                                </button>
                              </li>
                            </ul>
                          </div>

                          {/* Cancel Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleCancelApplication(application)}
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error hover:text-error-content"
                            title="Cancel/Reject Application"
                            disabled={updateApplicationMutation.isPending}
                          >
                            <MdCancel className="text-lg" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
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
                          Applications will appear here once users apply
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

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl w-full bg-base-100 shadow-2xl border border-base-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-base-300">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-primary"
              >
                Application Feedback
              </motion.h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseFeedbackModal}
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
              {/* Application Info */}
              {selectedApplication && (
                <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-box p-4 border border-primary/20">
                  <p className="text-sm text-neutral/70 mb-1">Applicant</p>
                  <p className="text-lg font-semibold text-primary">
                    {selectedApplication.userName || "N/A"}
                  </p>
                  <p className="text-sm text-neutral/70 mt-1">
                    {selectedApplication.universityName || "N/A"}
                  </p>
                </div>
              )}

              {/* Feedback Comment Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-neutral">
                  Feedback Comment
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter feedback comment..."
                  className="textarea textarea-bordered w-full h-32 resize-none focus:outline-none focus:border-primary"
                  rows="5"
                />
                <p className="text-xs text-neutral/70">
                  {feedback.length} characters
                </p>
              </div>
            </motion.div>

            {/* Modal Footer */}
            <div className="modal-action mt-6 pt-4 border-t border-base-300">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseFeedbackModal}
                className="btn btn-ghost"
              >
                Close
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitFeedback}
                disabled={
                  !feedback.trim() || updateApplicationMutation.isPending
                }
                className="btn btn-primary"
              >
                {updateApplicationMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Update Feedback"
                )}
              </motion.button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={handleCloseFeedbackModal}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ManageAppliedApplications;
