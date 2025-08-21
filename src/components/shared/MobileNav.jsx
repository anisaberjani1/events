import React, { useState } from "react";
import { Drawer, DrawerItems } from "flowbite-react";
import menu from "../../assets/icons/menu.svg";
import logo from "../../assets/logo.png";
import NavItems from "./NavItems";
import { useUser } from "../../context/UserContext";
const MobileNav = () => {
  const { logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavItemClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <img src={menu} alt="menu" width={40} height={80} className="!mt-3" />
      </button>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        className="!bg-white !shadow-lg !w-64 !p-6"
      >
        <DrawerItems>
          <div className="flex flex-col gap-6">
            <img src={logo} alt="logo" width={128} height={38} />

            <hr className="border border-gray-200" />
            <NavItems onItemClick={handleNavItemClick} />
            <button
              className="button bg-gray-200 absolute bottom-3 p-me"
              onClick={() => logout()}
            >
              Log Out
            </button>
          </div>
        </DrawerItems>
      </Drawer>
    </nav>
  );
};

export default MobileNav;
