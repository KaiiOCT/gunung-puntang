import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import hamMenu from "../assets/hamMenu.svg";
import logoNav from "../assets/logoNav.svg";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");

  const isDestination =
    location.pathname.startsWith("/destination") ||
    location.pathname.startsWith("/detail-destination");

  useEffect(() => {
    const handleScroll = () => {
      const isHome = location.pathname === "/";
      const aboutSection = document.getElementById("wisata");

      if (isHome && aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;

        if (top <= 60) {
          setBgColor("bg-emerald-800");
        } else {
          setBgColor("bg-transparent");
        }
      } else {
        setBgColor("bg-emerald-800");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`${bgColor} text-white fixed w-full px-14 z-50 transition-colors duration-300`}
    >
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-xl justify-center items-center">
              <img src={logoNav} alt="Logo" className="h-14 w-14" />
              <h2 className="font-medium">Gunung Puntang</h2>
            </div>
            <div className="hidden md:block my-auto">
              <nav className="flex ml-10 gap-8 items-center justify-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 text-lg" : "text-white text-lg"
                  }
                >
                  Beranda
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 text-lg" : "text-white text-lg"
                  }
                >
                  Tentang Kami
                </NavLink>
                <NavLink
                  to="/destination"
                  className={`${
                    isDestination ? "text-orange-500" : "text-white"
                  } text-lg`}
                >
                  Destinasi
                </NavLink>
                <a className="text-lg" href="http://127.0.0.1:8000/">
                  Peta Digital
                </a>
              </nav>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button">
              <img src={hamMenu} alt="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "text-white"
            }
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "text-white"
            }
            onClick={() => setIsOpen(false)}
          >
            Tentang Kami
          </NavLink>
          <NavLink
            to="/destination"
            className={`${
              isDestination ? "text-orange-500" : "text-white"
            } text-lg`}
            onClick={() => setIsOpen(false)}
          >
            Destinasi
          </NavLink>
          <a href="#" onClick={() => setIsOpen(false)}>
            Peta Digital
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
