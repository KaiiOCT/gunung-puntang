import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname.startsWith("/aboutA")) return "Tentang Kami";
    if (location.pathname.startsWith("/destinationA")) return "Destinasi";
    if (location.pathname.startsWith("/formAbout")) return "Tambah Tentang Kami";
    if (location.pathname.startsWith("/formDestination")) return "Tambah Destinasi";
    return "Dashboard Admin";
  };

  const handleBack = () => navigate(-1);
  const handleLogout = () => navigate("/");

  const isDashboard = location.pathname === "/dashboardA";

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 shadow-md">
      <h2 className="text-xl font-semibold">{getTitle()}</h2>

      {isDashboard ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-gray-200 transition"
        >
          <MdLogout size={20} />
          Logout
        </button>
      ) : (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white hover:text-gray-200 transition"
        >
          <IoMdArrowBack size={20} />
          Kembali
        </button>
      )}
    </header>
  );
};

export default Navbar;
