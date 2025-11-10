import { useEffect, useState } from "react";
import {
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { saveReview, getReviewsByDestination } from "../../utils/localReview";

const MainContent = () => {
  const [data, setData] = useState(null);
  const [gambarUtama, setGambarUtama] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    nama: "",
    komentar: "",
    rating: 5,
  });

  const DESTINATION_ID = "about"; // ✅ biar unik di localStorage

  // --- Fetch data utama ---
  const fetchData = async () => {
    try {
      const response = await fetch("/data-tentang-kami.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const json = await response.json();
      setData(json);
      setGambarUtama(json.gambarList[0]);

      // Ambil review dari localStorage lewat helper
      const saved = getReviewsByDestination(DESTINATION_ID);
      setReviews(saved);
    } catch (error) {
      console.error("Error mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Submit Review ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.nama.trim() || !newReview.komentar.trim()) return;

    const reviewBaru = {
      nama: newReview.nama,
      komentar: newReview.komentar,
      rating: newReview.rating,
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };

    // Simpan ke localStorage pakai helper
    saveReview(DESTINATION_ID, reviewBaru);

    // Update state supaya langsung tampil
    setReviews([...reviews, reviewBaru]);

    // Reset form
    setNewReview({ nama: "", komentar: "", rating: 5 });
  };

  if (!data) return <div className="text-center py-10">Loading...</div>;

  // --- Ambil Top 2 Review ---
  const topReviews = [...reviews]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 2);

  return (
    <div id="aboutPage" className="max-w-5xl mx-auto px-6 md:px-14 py-14">
      {/* ===== Judul ===== */}
      <h2 className="text-2xl font-bold mb-1">{data.nama}</h2>
      <p className="text-sm text-white mb-6 flex items-center gap-2">
        <FaMapMarkerAlt className="text-orange-500" /> {data.lokasi}
      </p>

      {/* ===== Gambar Utama & Thumbnail ===== */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={gambarUtama}
          alt="Gambar Utama"
          className="w-full max-w-3xl h-[250px] sm:h-[350px] md:h-[420px] object-cover rounded-xl shadow-lg"
        />
        <div className="flex flex-wrap gap-4 justify-center w-full max-w-3xl">
          {data.gambarList.map((src, index) => (
            <img
              key={index}
              src={src}
              onClick={() => setGambarUtama(src)}
              alt={`thumb-${index}`}
              className={`w-28 h-20 sm:w-36 sm:h-24 object-cover rounded-lg cursor-pointer border-2 ${
                gambarUtama === src
                  ? "border-orange-500 border-4"
                  : "border-transparent hover:border-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== Deskripsi + Peta Lokasi ===== */}
      <div className="mt-14 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
          <p className="text-white text-sm leading-relaxed text-justify">
            {data.deskripsi}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Peta Lokasi</h3>
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=Gunung%20Puntang&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default MainContent;
