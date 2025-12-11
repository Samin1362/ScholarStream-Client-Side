// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentSuccess = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["payment-update", user?.email, id],
    queryFn: async () => {
      const userData = {
        id: id,
      };
      const res = await axiosSecure.patch(
        `/applications/payment-done/${id}`,
        userData
      );
      return res.data;
    },
    enabled: !!id && !!user?.email, // Only run if id and email exist
  });


  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-base-100 rounded-box shadow-2xl p-8 md:p-12 border border-base-300 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              {/* Animated Circle */}
              <motion.div
                className="w-32 h-32 rounded-full bg-linear-to-br from-secondary to-primary flex items-center justify-center mx-auto"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-20 h-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Pulsing Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-secondary"
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary"
                animate={{
                  scale: [1, 1.3, 1.3],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-neutral mb-2">
              Your application fee has been processed
            </p>
            <p className="text-base text-neutral/70">
              Thank you for your payment. Your scholarship application is now
              being processed.
            </p>
          </motion.div>

          {/* Payment Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-base-200 rounded-box p-6 border border-base-300"
          >
            <h3 className="text-lg font-semibold text-primary mb-4">
              Payment Details
            </h3>
            <div className="space-y-2 text-left">
              {id && (
                <div className="flex justify-between">
                  <span className="text-neutral">Scholarship ID:</span>
                  <span className="font-medium text-primary">
                    {id.substring(0, 20)}...
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral">Status:</span>
                <span className="badge badge-success text-white">
                  Completed
                </span>
              </div>
              {isLoading && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-neutral text-sm">
                    Updating database...
                  </span>
                  <span className="loading loading-spinner loading-sm text-primary"></span>
                </div>
              )}
              {isSuccess && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-neutral text-sm">
                    Database updated:
                  </span>
                  <span className="badge badge-success badge-sm text-white">
                    ✓ Success
                  </span>
                </div>
              )}
              {isError && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-error text-sm">
                    Update failed:{" "}
                    {error?.response?.data?.message ||
                      error?.message ||
                      "Unknown error"}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/allScholarships" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-full text-white"
              >
                Browse More Scholarships
              </motion.button>
            </Link>
            <Link to="/dashboard/myProfile" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-primary w-full"
              >
                View My Profile
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex justify-center gap-2"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-secondary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
