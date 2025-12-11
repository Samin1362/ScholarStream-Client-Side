import React from "react";
import { Link, Outlet, useNavigation, useLocation } from "react-router";
import { FaAddressBook, FaUsersCog } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import { LuLetterText } from "react-icons/lu";
import { MdManageAccounts, MdOutlineReviews, MdReviews } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const { role } = useRole();

  return (
    <>
      {navigation.state === "loading" && <Loader />}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="navbar w-full bg-linear-to-r from-base-200 to-base-300 shadow-md border-b border-base-300"
          >
            <motion.label
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost hover:bg-primary/10"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-5 text-primary"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </motion.label>
            <div className="px-4">
              <Link to="/">
                <Logo></Logo>
              </Link>
            </div>
          </motion.nav>
          {/* Page content here */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-base-200 min-h-screen"
          >
            <Outlet></Outlet>
          </motion.div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-full flex-col items-start bg-linear-to-b from-base-100 to-base-200 shadow-2xl border-r border-base-300 is-drawer-close:w-14 is-drawer-open:w-64"
          >
            {/* Sidebar Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full bg-linear-to-r from-primary to-secondary p-4 is-drawer-close:hidden"
            >
              <h2 className="text-xl font-bold text-white">Dashboard</h2>
              <p className="text-white/80 text-sm">ScholarStream</p>
            </motion.div>

            {/* Sidebar content here */}
            <ul className="menu w-full grow p-2 gap-1 text-left">
              {/* List item */}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link to="/dashboard/myProfile">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                      isActive("/dashboard/myProfile")
                        ? "bg-linear-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/50 font-semibold border-l-4 border-white"
                        : "hover:bg-primary/10 text-neutral"
                    }`}
                    data-tip="My Profile"
                  >
                    <ImProfile
                      className={`text-lg ${
                        isActive("/dashboard/myProfile")
                          ? "text-white"
                          : "text-primary"
                      }`}
                    />
                    <span className="is-drawer-close:hidden text-left font-medium">
                      My Profile
                    </span>
                  </motion.button>
                </Link>
              </motion.li>

              {/* my application route */}
              {role.role === "student" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link to="/dashboard/myApplications">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/myApplications")
                            ? "bg-linear-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/50 font-semibold border-l-4 border-white"
                            : "hover:bg-primary/10 text-neutral"
                        }`}
                        data-tip="My Applications"
                      >
                        <LuLetterText
                          className={`text-lg ${
                            isActive("/dashboard/myApplications")
                              ? "text-white"
                              : "text-primary"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          My Applications
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}

              {/* my reviews route */}
              {role.role === "student" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Link to="/dashboard/myReviews">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/myReviews")
                            ? "bg-linear-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/50 font-semibold border-l-4 border-white"
                            : "hover:bg-primary/10 text-neutral"
                        }`}
                        data-tip="My Reviews"
                      >
                        <MdReviews
                          className={`text-lg ${
                            isActive("/dashboard/myReviews")
                              ? "text-white"
                              : "text-primary"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          My Reviews
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}

              {/* manage applied application route */}
              {role.role === "moderator" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link to="/dashboard/manageAppliedApplications">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/manageAppliedApplications")
                            ? "bg-linear-to-r from-secondary to-secondary/90 text-white shadow-lg shadow-secondary/50 font-semibold border-l-4 border-white"
                            : "hover:bg-secondary/10 text-neutral"
                        }`}
                        data-tip="Manage Applied Applications"
                      >
                        <MdManageAccounts
                          className={`text-lg ${
                            isActive("/dashboard/manageAppliedApplications")
                              ? "text-white"
                              : "text-secondary"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          Manage Applied Applications
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}

              {/* all reviews route */}
              {role.role === "moderator" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Link to="/dashboard/allReviews">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/allReviews")
                            ? "bg-linear-to-r from-secondary to-secondary/90 text-white shadow-lg shadow-secondary/50 font-semibold border-l-4 border-white"
                            : "hover:bg-secondary/10 text-neutral"
                        }`}
                        data-tip="All Reviews"
                      >
                        <MdOutlineReviews
                          className={`text-lg ${
                            isActive("/dashboard/allReviews")
                              ? "text-white"
                              : "text-secondary"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          All Reviews
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}


              {/* add scholarship route */}
              {role.role === "admin" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Link to="/dashboard/addScholarship">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/addScholarship")
                            ? "bg-linear-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/50 font-semibold border-l-4 border-white"
                            : "hover:bg-primary/10 text-neutral"
                        }`}
                        data-tip="Add Scholarship"
                      >
                        <FaAddressBook
                          className={`text-lg ${
                            isActive("/dashboard/addScholarship")
                              ? "text-white"
                              : "text-primary"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          Add Scholarship
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}

              {/* manage scholarship route */}
              {role.role === "admin" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link to="/dashboard/manageScholarships">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/manageScholarships")
                            ? "bg-linear-to-r from-accent to-accent/90 text-white shadow-lg shadow-accent/50 font-semibold border-l-4 border-white"
                            : "hover:bg-accent/10 text-neutral"
                        }`}
                        data-tip="Manage Scholarships"
                      >
                        <MdManageAccounts
                          className={`text-lg ${
                            isActive("/dashboard/manageScholarships")
                              ? "text-white"
                              : "text-accent"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          Manage Scholarships
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}

              {/* manage users route */}
              {role.role === "admin" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Link to="/dashboard/manageUsers">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/manageUsers")
                            ? "bg-linear-to-r from-accent to-accent/90 text-white shadow-lg shadow-accent/50 font-semibold border-l-4 border-white"
                            : "hover:bg-accent/10 text-neutral"
                        }`}
                        data-tip="Manage Users"
                      >
                        <FaUsersCog
                          className={`text-lg ${
                            isActive("/dashboard/manageUsers")
                              ? "text-white"
                              : "text-accent"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          Manage Users
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}

              {/* analytics route */}
              {role.role === "admin" && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link to="/dashboard/analytics">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right w-full justify-start gap-3 rounded-lg transition-all duration-200 py-3 px-4 ${
                          isActive("/dashboard/analytics")
                            ? "bg-linear-to-r from-warning to-warning/90 text-white shadow-lg shadow-warning/50 font-semibold border-l-4 border-white"
                            : "hover:bg-warning/10 text-neutral"
                        }`}
                        data-tip="Analytics"
                      >
                        <SiGoogleanalytics
                          className={`text-lg ${
                            isActive("/dashboard/analytics")
                              ? "text-white"
                              : "text-warning"
                          }`}
                        />
                        <span className="is-drawer-close:hidden text-left font-medium">
                          Analytics
                        </span>
                      </motion.button>
                    </Link>
                  </motion.li>
                </>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
