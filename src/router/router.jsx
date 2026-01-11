import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import MyProfile from "../pages/Dashboard/MyProfile";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/PaymentCancelled";
import MyApplications from "../pages/Dashboard/MyApplications";
import MyReviews from "../pages/Dashboard/MyReviews";
import ManageAppliedApplications from "../pages/Dashboard/Moderator/ManageAppliedApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import About from "../pages/About";
import PrivateRoute from "../contexts/PrivateRoute";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/allScholarships",
        Component: AllScholarships,
      },
      {
        path: "/scholarship/:id",
        Component: ScholarshipDetails,
      },
      {
        path: "/about",
        Component: About,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "addScholarship",
        element: (
          <AdminRoute>
            <AddScholarship></AddScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "myApplications",
        Component: MyApplications,
      },
      {
        path: "myReviews",
        Component: MyReviews,
      },

      {
        path: "payment-success/:id",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "manageAppliedApplications",
        element: (
          <ModeratorRoute>
            <ManageAppliedApplications></ManageAppliedApplications>
          </ModeratorRoute>
        ),
      },
      {
        path: "allReviews",
        element: (
          <ModeratorRoute>
            <AllReviews></AllReviews>
          </ModeratorRoute>
        ),
      },
      {
        path: "manageScholarships",
        element: (
          <AdminRoute>
            <ManageScholarships></ManageScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics></Analytics>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
