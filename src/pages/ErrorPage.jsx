// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import Logo from "../components/Logo";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo size="lg" className="justify-center mb-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-4xl font-bold text-neutral mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral/80 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's
            get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary text-white px-8"
            >
              Go Home
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="btn btn-outline btn-primary"
          >
            Go Back
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64">
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
            </motion.svg>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-32 h-32 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-sm text-neutral/60"
        >
          <p>If you believe this is an error, please contact support.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
