// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const links = (
    <>
      <li>
        <Link
          to="/allScholarships"
          className="text-neutral hover:text-primary transition-colors"
        >
          All Scholarships
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-neutral hover:text-primary transition-colors"
        >
          Categories
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-neutral hover:text-primary transition-colors"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          className="text-neutral hover:text-primary transition-colors"
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="navbar bg-base-100 border-b border-base-300 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-300"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost hover:bg-base-200">
          <Logo size="sm" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost gap-2 hover:bg-base-200"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-primary text-primary-content flex items-center justify-center text-lg font-semibold rounded-full">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <span className="hidden md:block font-medium text-neutral">
                {user.displayName || user.email?.split("@")[0] || "User"}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li className="px-4 py-2 border-b border-base-300">
                <div className="flex flex-col">
                  <span className="font-semibold text-primary">
                    {user.displayName || "User"}
                  </span>
                  <span className="text-xs text-neutral">{user.email}</span>
                </div>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-neutral hover:text-primary hover:bg-base-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error hover:bg-error hover:text-error-content w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-ghost text-neutral hover:text-primary hover:bg-base-200"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-white"
              >
                Register
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
