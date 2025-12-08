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
        path: "payment-success", 
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