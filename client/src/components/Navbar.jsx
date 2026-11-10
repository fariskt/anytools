import React from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="px-8 my-6">
        <Link to="/">
        <h1 className="text-4xl font-serif">AnyTools</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
