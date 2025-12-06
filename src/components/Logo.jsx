// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Logo = ({ size = "md", showText = true, className = "" }) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated Icon */}
      <motion.div
        className={`relative ${iconSizes[size]}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Book Base */}
        <motion.svg
          viewBox="0 0 64 64"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Book Pages */}
          <motion.path
            d="M12 8C12 6.89543 12.8954 6 14 6H50C51.1046 6 52 6.89543 52 8V56C52 57.1046 51.1046 58 50 58H14C12.8954 58 12 57.1046 12 56V8Z"
            fill="#2563eb"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          {/* Book Cover */}
          <motion.path
            d="M12 8C12 6.89543 12.8954 6 14 6H28V56H14C12.8954 56 12 55.1046 12 54V8Z"
            fill="#14b8a6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          {/* Book Lines (Pages) */}
          <motion.line
            x1="20"
            y1="16"
            x2="44"
            y2="16"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.line
            x1="20"
            y1="24"
            x2="44"
            y2="24"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          />
          <motion.line
            x1="20"
            y1="32"
            x2="38"
            y2="32"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />

          {/* Star Badge */}
          <motion.g
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 1.4,
            }}
          >
            <motion.path
              d="M32 42L34.5 48L41 49.5L36 54L37 60.5L32 57.5L27 60.5L28 54L23 49.5L29.5 48L32 42Z"
              fill="#8b5cf6"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.g>
        </motion.svg>
      </motion.div>

      {/* Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span
            className={`font-bold ${sizeClasses[size]} text-primary leading-tight`}
            whileHover={{ scale: 1.05 }}
          >
            Scholar
            <motion.span
              className="text-secondary"
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Stream
            </motion.span>
          </motion.span>
          <motion.span
            className="text-xs text-neutral font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Scholarship Management
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;
