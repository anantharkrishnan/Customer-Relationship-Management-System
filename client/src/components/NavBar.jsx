import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {axiosInstance} from "../services/axiosInstance";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axiosInstance.get("/user/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CRM System
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/customerpage" className="text-gray-700 hover:text-blue-600">
            Customers
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
          >
            Register
          </Link>

          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-4">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/tasks" onClick={() => setIsOpen(false)}>
            Tasks
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            Register
          </Link>
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


