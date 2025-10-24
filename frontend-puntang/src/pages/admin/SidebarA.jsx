import React from "react";
import { useLocation } from "react-router-dom";
import { FaMountain, FaHome, FaUserAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";

const SidebarA = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="w-64 bg-gradient-to-b from-green-700 to-green-600 text-white flex flex-col justify-between fixed h-screen">
      <div>
        <div className="flex items-center gap-3 p-5 border-b border-green-500">
          <FaMountain size={30} />
          <h1 className="font-semibold text-lg">Gunung Puntang</h1>
        </div>

        <nav className="flex flex-col mt-6 space-y-2 px-4">
          <a
            href="/dashboardA"
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              isActive("/dashboardA") ? "bg-green-800" : "hover:bg-green-800"
            }`}
          >
            <FaHome /> Dashboard
          </a>

          <a
            href="/aboutA"
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              isActive("/aboutA") || isActive("/formAbout")
                ? "bg-green-800"
                : "hover:bg-green-800"
            }`}
          >
            <MdLocationOn /> Tentang Kami
          </a>

          <a
            href="/destinationA"
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              isActive("/destinationA") || isActive("/formDestination")
                ? "bg-green-800"
                : "hover:bg-green-800"
            }`}
          >
            <FaUserAlt /> Destinasi
          </a>

          <a
            href="/reviewA"
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              isActive("/reviewA") ? "bg-green-800" : "hover:bg-green-800"
            }`}
          >
            <BsChatDotsFill /> Review User
          </a>
        </nav>
      </div>

      <div className="p-4 text-sm text-center opacity-80 border-t border-green-500">
        © 2025 Gunung Puntang
      </div>
    </aside>
  );
};

export default SidebarA;
