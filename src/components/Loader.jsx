// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-base-100 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          className="relative w-20 h-20 mx-auto mb-6"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Book Pages */}
            <motion.path
              d="M12 8C12 6.89543 12.8954 6 14 6H50C51.1046 6 52 6.89543 52 8V56C52 57.1046 51.1046 58 50 58H14C12.8954 58 12 57.1046 12 56V8Z"
              fill="#2563eb"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Book Cover */}
            <motion.path
              d="M12 8C12 6.89543 12.8954 6 14 6H28V56H14C12.8954 56 12 55.1046 12 54V8Z"
              fill="#14b8a6"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />

            {/* Star Badge */}
            <motion.path
              d="M32 42L34.5 48L41 49.5L36 54L37 60.5L32 57.5L27 60.5L28 54L23 49.5L29.5 48L32 42Z"
              fill="#8b5cf6"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-primary mb-2">
            ScholarStream
          </h3>
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="w-2 h-2 bg-secondary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-2 h-2 bg-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: 0.4,
              }}
            />
          </div>
          <p className="text-neutral text-sm mt-4">Loading...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
