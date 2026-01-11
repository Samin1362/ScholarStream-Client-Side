// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("scholarlight");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("scholarstream-theme") || "scholarlight";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "scholarlight" ? "scholardark" : "scholarlight";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("scholarstream-theme", newTheme);
  };

  const isDark = theme === "scholardark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="btn btn-ghost btn-circle text-primary hover:bg-base-200"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <FaSun className="text-2xl text-warning" />
        ) : (
          <FaMoon className="text-2xl text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
