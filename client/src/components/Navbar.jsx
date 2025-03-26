import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 p-4 shadow-lg">
      <ul className="flex justify-between items-center max-w-4xl mx-auto">
        {/* Home Link */}
        <li>
          <Link
            to="/"
            className="text-white text-lg font-medium flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-700 hover:text-gray-100 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
        </li>
        {/* About Link */}
        <li>
          <Link
            to="/about"
            className="text-white text-lg font-medium flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-purple-700 hover:text-gray-100 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>About</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;