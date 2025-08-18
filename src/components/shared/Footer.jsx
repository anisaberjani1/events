import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link to="/">
          {/* <img src="" alt="logo" width={128} height={38}/> */}
          Logo
        </Link>
        <p>2025 Events. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
