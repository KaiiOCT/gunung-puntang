import igSvg from "../assets/ig.svg";
import emailSvg from "../assets/email.svg";
import tiktokSvg from "../assets/tt.svg";
import ytSvg from "../assets/yt.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-emerald-800 text-white p-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium mb-4">Gunung Puntang</h2>
          <nav className="flex flex-col gap-4">
            <NavLink to="/">Beranda</NavLink>
            <NavLink to="/destination">Destinasi</NavLink>
            <NavLink to="/">Peta Digital</NavLink>
            <NavLink to="/">Kontak Kami</NavLink>
          </nav>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-medium mb-4">Sosial Media</h2>
          <nav className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-2">
              <img src={igSvg} alt="Instagram" className="w-6 h-6" />
              @PutangGunung
            </a>
            <a href="#" className="flex items-center gap-2">
              <img src={emailSvg} alt="Instagram" className="w-6 h-6" />
              @Puntang@gmail.com
            </a>
            <a href="#" className="flex items-center gap-2">
              <img src={tiktokSvg} alt="Instagram" className="w-6 h-6" />
              @AhayPuntang
            </a>
            <a href="#" className="flex items-center gap-2">
              <img src={ytSvg} alt="Instagram" className="w-6 h-6" />
              @HaaPuntang
            </a>
          </nav>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-medium mb-4">Alamat</h2>
          <p>
            Gunung Puntang, Desa Campakamulya, Kecamatan Cimaung, Kabupaten
            Bandung, Jawa Barat.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
