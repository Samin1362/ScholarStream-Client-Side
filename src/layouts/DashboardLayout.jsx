import React from "react";
import { Link, Outlet, useNavigation } from "react-router";
import { FaAddressBook } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import { LuLetterText } from "react-icons/lu";
import { MdManageAccounts, MdOutlineReviews, MdReviews } from "react-icons/md";

const DashboardLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && <Loader />}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
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
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">
              <Link to="/">
                <Logo></Logo>
              </Link>
            </div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <Link to="/dashboard/myProfile">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                  >
                    {/* Home icon */}
                    <ImProfile />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/addScholarship">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Scholarship"
                  >
                    {/* Home icon */}
                    <FaAddressBook />
                    <span className="is-drawer-close:hidden">
                      Add Scholarship
                    </span>
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/myApplications">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Applications"
                  >
                    {/* application icon */}
                    <LuLetterText />
                    <span className="is-drawer-close:hidden">
                      My Applications
                    </span>
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/myReviews">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Reviews"
                  >
                    {/* application icon */}
                    <MdReviews />
                    <span className="is-drawer-close:hidden">
                      My Reviews
                    </span>
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/manageAppliedApplications">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Applied Applications"
                  >
                    {/* application icon */}
                    <MdManageAccounts />
                    <span className="is-drawer-close:hidden">
                      Manage Applied Applications
                    </span>
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/allReviews">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Reviews"
                  >
                    {/* application icon */}
                    <MdOutlineReviews />
                    <span className="is-drawer-close:hidden">
                      All Reviews
                    </span>
                  </button>
                </li>
              </Link>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
