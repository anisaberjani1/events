import React from "react";
import { Outlet } from "react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Fragment } from "react";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
