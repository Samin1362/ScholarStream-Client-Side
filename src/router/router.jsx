import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children : [
      {
        path: "/", 
        Component: Home
      }
    ]
  },
  {
    path: "/", 
    Component: AuthLayout, 
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
  }
]);

export default router;