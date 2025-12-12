/**
 * Notification Component
 *
 * Usage:
 * 1. Wrap your app with NotificationProvider in Root.jsx or main.jsx:
 *    <NotificationProvider>
 *      <App />
 *    </NotificationProvider>
 *
 * 2. Use notifications in any component:
 *    import { useNotification } from '../components/Notification';
 *
 *    const { success, error } = useNotification();
 *
 *    // Show success notification
 *    success('Operation completed successfully!');
 *
 *    // Show error notification
 *    error('Something went wrong!');
 *
 *    // Custom duration (default is 5000ms)
 *    success('Saved!', 3000);
 */

import React, { createContext, useContext, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

// Notification Context
const NotificationContext = createContext(null);

// Hook to use notifications
// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const showNotification = useCallback(
    (message, type = "success", duration = 5000) => {
      const id = Date.now() + Math.random();
      const notification = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      // Auto remove after duration
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [removeNotification]
  );

  const success = useCallback(
    (message, duration) => showNotification(message, "success", duration),
    [showNotification]
  );

  const error = useCallback(
    (message, duration) => showNotification(message, "error", duration),
    [showNotification]
  );

  return (
    <NotificationContext.Provider value={{ success, error, showNotification }}>
      {children}
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </NotificationContext.Provider>
  );
};

// Notification Container Component
const NotificationContainer = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <div className="flex flex-col gap-3 items-end">
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Individual Notification Item
const NotificationItem = ({ notification, onClose }) => {
  const { message, type } = notification;

  const isSuccess = type === "success";
  const bgColor = isSuccess
    ? "bg-gradient-to-r from-success to-success/90"
    : "bg-gradient-to-r from-error to-error/90";
  const iconColor = isSuccess ? "text-success-content" : "text-error-content";
  const borderColor = isSuccess ? "border-success" : "border-error";

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${bgColor} text-white rounded-box shadow-2xl border-2 ${borderColor} min-w-[320px] max-w-[420px] pointer-events-auto overflow-hidden`}
    >
      {/* Progress Bar */}
      <motion.div
        className={`h-1 ${
          isSuccess ? "bg-success-content/30" : "bg-error-content/30"
        }`}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{
          duration: notification.duration / 1000,
          ease: "linear",
        }}
      />

      <div className="p-4 flex items-start gap-3">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className={`${iconColor} shrink-0 mt-0.5`}
        >
          {isSuccess ? (
            <FaCheckCircle className="text-2xl" />
          ) : (
            <FaTimesCircle className="text-2xl" />
          )}
        </motion.div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base leading-relaxed wrap-break-word">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className={`${iconColor} hover:bg-white/20 rounded-full p-1 shrink-0 transition-colors`}
          aria-label="Close notification"
        >
          <FaTimes className="text-sm" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Default export for backward compatibility
const Notification = () => {
  return null;
};

export default Notification;
