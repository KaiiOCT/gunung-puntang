import BannerAbout from "../../assets/BannerAbout.jpg";

const Banner = () => {
  return (
    <div id="bannerHome" className="relative w-full h-[400px]">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${BannerAbout})` }}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full bg-emerald-800 opacity-50 z-10"></div>

      <div className="absolute top-0 left-0 w-full h-full z-20 flex justify-center items-center">
        <h1 className="text-white text-3xl font-bold">Destinasi</h1>
      </div>
    </div>
  );
};

export default Banner;
