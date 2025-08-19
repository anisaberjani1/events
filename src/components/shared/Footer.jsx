import React from "react";
import { Link } from "react-router";
import Logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 !py-2">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link to="/">
          <img src={Logo} alt="logo" width={128} height={38} />
        </Link>
        <p>2025 Events. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
