import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const WisataCard = () => {
  const [dataWisata, setDataWisata] = useState([]);
  const [indexAwal, setIndexAwal] = useState(0);
  const [maxDisplay, setMaxDisplay] = useState(2);
  const [cardWidth, setCardWidth] = useState(320);
  const [gap, setGap] = useState(24);

  const fetchDatas = async () => {
    try {
      const response = await fetch("/data-puntang.json");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setDataWisata(data);
    } catch (error) {
      console.log("Error mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setMaxDisplay(1);
        setCardWidth(280);
        setGap(16);
      } else {
        setMaxDisplay(2);
        setCardWidth(320);
        setGap(24);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (indexAwal + maxDisplay < dataWisata.length) {
      setIndexAwal(indexAwal + 1);
    }
  };

  const prevSlide = () => {
    if (indexAwal > 0) {
      setIndexAwal(indexAwal - 1);
    }
  };

  return (
    <section
      id="wisata"
      className="relative py-24 bg-gradient-to-r from-black/70 to-black/40 text-white overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        {/* ===== KIRI: TEKS DESKRIPSI ===== */}
        <div className="space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold">Wisata Populer</h1>
          <p className="text-base text-gray-300 leading-relaxed">
            Beberapa wisata populer yang berada di sekitar Gunung Puntang
            memberikan pengalaman alam yang tak terlupakan — mulai dari wisata sejarah hingga keindahan alamnya.
          </p>

          <Link
            to="/destination"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Lihat lebih banyak <SlArrowRight className="ml-2" />
          </Link>

          {/* Indikator Slide */}
          <div className="pt-4 text-sm font-medium tracking-wide">
            {String(indexAwal + 1).padStart(2, "0")}/
            {String(dataWisata.length).padStart(2, "0")}
          </div>

          {/* Navigasi */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={prevSlide}
              disabled={indexAwal === 0}
              className="p-3 bg-white/20 hover:bg-white/40 rounded-full disabled:opacity-40 transition"
            >
              <SlArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={indexAwal + maxDisplay >= dataWisata.length}
              className="p-3 bg-white/20 hover:bg-white/40 rounded-full disabled:opacity-40 transition"
            >
              <SlArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ===== KANAN: CAROUSEL ===== */}
<div className="relative w-full overflow-hidden">
  <div
    className="flex transition-transform duration-500 ease-in-out"
    style={{
      gap: `${gap}px`,
      transform: `translateX(-${indexAwal * (cardWidth + gap)}px)`,
    }}
  >
    {dataWisata.map((wisata) => (
  <div
    key={wisata.id}
    className="flex-shrink-0 bg-white text-black rounded-2xl shadow-lg group flex flex-col overflow-hidden"
    style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
  >
    {/* Gambar */}
    <div className="w-full aspect-[4/3] overflow-hidden">
      <img
        src={wisata.gambarList[2]}
        alt={wisata.nama}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Konten bawah */}
    <div className="p-4 flex flex-col items-center justify-between flex-1 text-center">
      <h3 className="font-semibold text-md mb-3 leading-tight line-clamp-2">
        {wisata.nama}
      </h3>
         <Link
          to={`/detail-destination/${wisata.slug || wisata.id}`}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full transition"
        >
          Selengkapnya
        </Link>

          </div>
  </div>
))}

  </div>
</div>

      </div>
    </section>
  );
};

export default WisataCard;
