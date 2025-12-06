import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";

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
]);

export default router;