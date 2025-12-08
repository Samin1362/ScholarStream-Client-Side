// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import Loader from "../../components/Loader";

const MyProfile = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return Array.isArray(res.data) ? res.data[0] : res.data;
    },
    enabled: !!user?.email, 
  });

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
            Error loading profile: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4 flex justify-center items-center">
        <div className="text-center">
          <p className="text-neutral text-lg">No profile data found.</p>
        </div>
      </div>
    );
  }

  const { email, displayName, photoURL, role, createdAt } = userInfo || {};

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            My Profile
          </h1>
          <p className="text-neutral text-lg">
            Manage your account information and preferences
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-base-100 rounded-box shadow-xl p-6 md:p-8 border border-base-300 mb-6"
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: 0.4,
              }}
              className="relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 ring-offset-base-100">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold">
                    {displayName
                      ? displayName.charAt(0).toUpperCase()
                      : email?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
              {/* Status Indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 right-2 w-6 h-6 bg-secondary rounded-full border-4 border-base-100 flex items-center justify-center"
              >
                <FaCheckCircle className="text-white text-xs" />
              </motion.div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
              >
                {displayName || "User"}
              </motion.h2>
              {role && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block mb-3"
                >
                  <span className="badge badge-primary badge-lg text-primary-content px-4 py-2">
                    <FaUserShield className="mr-2" />
                    {role}
                  </span>
                </motion.div>
              )}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-neutral text-lg flex items-center justify-center md:justify-start gap-2"
              >
                <FaEnvelope className="text-primary" />
                {email || "No email provided"}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral mb-1">Email Address</p>
                <p className="font-semibold text-lg text-primary break-all">
                  {email || "N/A"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Role Card */}
          {role && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <FaUserShield className="text-secondary text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral mb-1">Account Role</p>
                  <p className="font-semibold text-lg text-secondary">{role}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Display Name Card */}
          {displayName && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <FaUser className="text-accent text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral mb-1">Display Name</p>
                  <p className="font-semibold text-lg text-accent">
                    {displayName}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Account Created Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FaCalendarAlt className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral mb-1">Account Created</p>
                <p className="font-semibold text-lg text-primary">
                  {formattedDate}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary text-white flex items-center gap-2"
          >
            <FaEdit /> Edit Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline btn-primary flex items-center gap-2"
          >
            Change Password
          </motion.button>
        </motion.div> */}
      </div>
    </div>
  );
};

export default MyProfile;
