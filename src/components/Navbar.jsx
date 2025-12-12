// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";

// NavLink component defined outside to avoid render-time creation
const NavLink = ({ to, children, className = "", isActive }) => {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? "text-primary bg-primary/10 font-semibold"
          : "text-neutral hover:text-primary hover:bg-base-200"
      } ${className}`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId={`navbar-indicator-${to}`}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const links = (
    <>
      <li>
        <NavLink to="/allScholarships" isActive={isActive("/allScholarships")}>
          All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" isActive={isActive("/about")}>
          About
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard" isActive={isActive("/dashboard")}>
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="navbar bg-base-100 border-b border-base-300 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-95"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <motion.div
            tabIndex={0}
            role="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-base-300 gap-1"
          >
            {links}
          </ul>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="btn btn-ghost hover:bg-base-200">
            <Logo size="sm" />
          </Link>
        </motion.div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <motion.div
              tabIndex={0}
              role="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-ghost gap-2 hover:bg-base-200 rounded-lg"
            >
              <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 overflow-hidden">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-r from-primary to-secondary text-white flex items-center justify-center text-lg font-semibold">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <span className="hidden md:block font-medium text-neutral">
                {user.displayName || user.email?.split("@")[0] || "User"}
              </span>
            </motion.div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-xl border border-base-300"
            >
              <li className="px-4 py-3 border-b border-base-300 bg-base-200 rounded-t-box">
                <div className="flex flex-col">
                  <span className="font-semibold text-primary">
                    {user.displayName || "User"}
                  </span>
                  <span className="text-xs text-neutral">{user.email}</span>
                </div>
              </li>
              <li>
                <Link
                  to="/dashboard/myProfile"
                  className={`rounded-lg ${
                    isActive("/dashboard/myProfile")
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-neutral hover:text-primary hover:bg-base-200"
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-error hover:bg-error hover:text-error-content w-full text-left rounded-lg"
                >
                  Logout
                </motion.button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`btn btn-ghost rounded-lg ${
                  isActive("/login")
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-neutral hover:text-primary hover:bg-base-200"
                }`}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
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
