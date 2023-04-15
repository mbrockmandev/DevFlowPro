import React from "react";
import wind from "../wind.svg";
//TODO: add links and routing
const Header = () => {
  const handleMenuClick = (e) => {
    e.preventDefault();

    const menuItemDiv = document.getElementById("menu-items");
    console.log(menuItemDiv);

    const aTags = document.querySelectorAll(".menu-item");
    for (const tag of aTags) {
      if (tag.classList.contains("hidden")) {
        tag.classList.remove("hidden");
      } else {
        tag.classList.add("hidden");
      }
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-amber-600 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={wind} alt="" className="inline-block" width="24" />
          <span className="font-semibold text-xl tracking-tight">
            DevFlowPro
          </span>
        </div>
        <div id="menu-toggle" className="block md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-amber-200 border-amber-400 hover:text-white hover:border-white"
            onClick={handleMenuClick}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          id="menu-items"
          className="w-full block flex-grow md:flex md:items-center md:w-auto"
        >
          <div className="text-sm md:flex-grow">
            <a
              href="#responsive-header"
              className="hidden menu-item mt-4 md:inline-block md:mt-0 text-amber-200 hover:text-white mr-4"
            >
              Tickets
            </a>
            <a
              href="#responsive-header"
              className="hidden menu-item mt-4 md:inline-block md:mt-0 text-amber-200 hover:text-white mr-4"
            >
              API
            </a>
            <a
              href="#responsive-header"
              className="hidden menu-item mt-4 md:inline-block md:mt-0 text-amber-200 hover:text-white"
            >
              Documentation
            </a>
          </div>
          <div>
            <a
              href="/"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-amber-500 hover:bg-white mt-4 md:mt-0"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
