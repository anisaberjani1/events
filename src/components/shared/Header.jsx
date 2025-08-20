import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";
import Logo from "../../assets/logo.png";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log(user);
  return (
    <header className="w-full border-b border-gray-200 !py-3 ">
      <div className="wrapper flex items-center justify-between">
        <Link to="/" className="w-36">
          <img src={Logo} alt="Events logo" width={128} height={38} />
        </Link>

        <nav className="hidden md:flex md:flex-between w-full max-w-xs">
          <NavItems />
        </nav>
        <div className="flex w-32 justify-end gap-3">
          {!isAuthenticated && (
            <Button
              onClick={() => loginWithRedirect()}
              size="lg"
              className="button w-full sm:w-fit"
            >
              Sign In
            </Button>
          )}

          {isAuthenticated && (
            <Button
              onClick={() => logout()}
              size="lg"
              className="button w-full sm:w-fit hidden md:block"
            >
              Logout
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
