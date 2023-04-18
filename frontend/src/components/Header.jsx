import React, { useEffect } from "react";
import wind from "../wind.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logUserOut } from "../reducers/TokenReducer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const handleMenuClick = (e) => {
    e.preventDefault();

    const aTags = document.querySelectorAll(".menu-item");
    for (const tag of aTags) {
      if (tag.classList.contains("hidden")) {
        tag.classList.remove("hidden");
      } else {
        tag.classList.add("hidden");
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    // send token to backend to be invalidated
    await axios.post("/api/users/logout", token);
    localStorage.removeItem("jwt");
    dispatch(logUserOut());
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            src={wind}
            alt=""
            className="inline-block"
            width="24"
          />
          <span className="font-semibold text-xl tracking-tight">
            DevFlowPro
          </span>
        </div>
        <div
          id="menu-toggle"
          className="block md:hidden"
        >
          <button
            className="flex items-center px-3 py-2 border rounded text-blue-100 border-blue-400 hover:text-white hover:border-white"
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
            <Link
              to="/tickets"
              className="hidden menu-item mt-4 md:inline-block md:mt-0 text-blue-200 hover:text-white mr-4"
            >
              Tickets
            </Link>
            <Link
              to="/admin"
              className="hidden menu-item mt-4 md:inline-block md:mt-0 text-blue-200 hover:text-white mr-4"
            >
              Admin
            </Link>
            <Link // may later change to swagger ui from front end
              to="http://localhost:3001/api/help"
              className="hidden menu-item mt-4 md:inline-block md:mt-0 text-blue-200 hover:text-white"
            >
              API
            </Link>
          </div>
          <div>
            {token.isValid && (
              <Link
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
                onClick={handleLogout}
              >
                Logout
              </Link>
            )}
            {!token.isValid && (
              <Link
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
