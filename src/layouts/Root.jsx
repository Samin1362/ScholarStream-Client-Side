import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Loader from "../components/Loader";

const Root = () => {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" && <Loader />}
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
