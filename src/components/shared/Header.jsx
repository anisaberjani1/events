import { Button } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link to="/" className="w-36">
          {/* <img src="" alt="Events logo" width={128} height={38}/> */}Logo
        </Link>
        {/* If signed in */}
        <nav className="md:flex-between w-full max-w-xs">
          <NavItems />
        </nav>
        <div className="flex w-32 justify-end gap-3">
          {/* If signed in */}
          <MobileNav/>
          {/* If signed out */}
          <Button
            onClick={() => navigate("login")}
            size="lg"
            className="button w-full sm:w-fit"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
