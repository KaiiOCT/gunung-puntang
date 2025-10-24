import { Link } from "react-router-dom";
import imgAbout from "../../assets/IMGAbout.svg";
const About = () => {
  return (
    <div className="my-14 px-4 sm:px-8 md:px-20">
      <h1 className="text-3xl sm:text-5xl font-bold text-emerald-800">
        Tentang Kami
      </h1>
      <h2 className="text-xl sm:text-2xl text-gray-500 mb-4 md:hidden">
        Sejak 1998
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 order-2 md:order-1">
          <h2 className="hidden md:block text-xl sm:text-2xl text-gray-500 pt-3">
            Sejak 1998
          </h2>
          <div className="px-2 md:px-8 pt-4">
            <p className="text-lg text-justify md:pr-14 pt-4 leading-relaxed">
            Gunung Puntang adalah destinasi wisata alam yang terletak di Bandung Selatan, tepatnya di Desa Campaka Mulya, Kecamatan Cimaung, Kabupaten Bandung. Dengan ketinggian 1.290 mdpl, Gunung Puntang menawarkan suasana sejuk, udara dingin, dan pemandangan alam yang menawan. Selain keindahan alam, Gunung Puntang juga kaya akan nilai sejarah dan edukasi. 
            </p>
            <div className="flex justify-center items-center bg-emerald-800 rounded-lg mt-4 w-1/3">
              <Link to="/about">
                <h1 className="py-2 text-md md:text-lg text-white">Selengkapnya</h1>
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img src={imgAbout} alt="Gambar Puntang" />
        </div>
      </div>
    </div>
  );
};

export default About;
