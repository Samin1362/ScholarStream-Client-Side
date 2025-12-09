import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AddScholarship from "../pages/Dashboard/AddScholarship";
import MyProfile from "../pages/Dashboard/MyProfile";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/PaymentCancelled";
import MyApplications from "../pages/Dashboard/MyApplications";
import MyReviews from "../pages/Dashboard/MyReviews";
import ManageAppliedApplications from "../pages/Dashboard/Moderator/ManageAppliedApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children : [
      {
        path: "/", 
        Component: Home
      }, 
      {
        path: "/allScholarships",
        Component: AllScholarships
      }, 
      {
        path: "/scholarship/:id", 
        Component: ScholarshipDetails
      }
    ]
  },
  {
    path: "/", 
    Component: AuthLayout, 
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/login",
        Component: Login
      }, 
      {
        path: '/register', 
        Component: Register
      }
    ]
  }, 
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: <DashboardLayout></DashboardLayout>, 
    children: [
      {
        path: "addScholarship", 
        Component: AddScholarship
      }, 
      {
        path: "myProfile",
        Component: MyProfile
      }, 
      {
        path: "myApplications", 
        Component: MyApplications
      },
      {
        path: "myReviews", 
        Component: MyReviews
      },
      {
        path: "manageAppliedApplications", 
        Component: ManageAppliedApplications
      },
      {
        path: "allReviews", 
        Component: AllReviews
      },
      {
        path: "payment-success/:id", 
        Component: PaymentSuccess
      }, 
      {
        path: "payment-cancelled", 
        Component: PaymentCancelled
      }
    ]
  }
]);

export default router;