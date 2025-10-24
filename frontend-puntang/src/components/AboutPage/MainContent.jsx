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
      <p className="text-sm text-gray-600 mb-6 flex items-center gap-2">
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
          <p className="text-gray-800 text-sm leading-relaxed text-justify">
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

      {/* ===== Informasi & Fasilitas ===== */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-4">Informasi & Fasilitas</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 bg-green-50 border rounded-full px-4 py-2">
            <FaClock className="text-green-600" />
            <span>{data.jam_operasional}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border rounded-full px-4 py-2">
            <FaMoneyBillWave className="text-green-600" />
            <span>{data.harga}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border rounded-full px-4 py-2">
            <FaCheckCircle className="text-green-600" />
            <span>{data.fasilitas}</span>
          </div>
        </div>
      </div>

      {/* ===== Top Review ===== */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-4">Top Reviews</h3>
        {topReviews.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada ulasan.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {topReviews.map((r, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-xl shadow-md border text-center"
              >
                <p className="font-semibold text-orange-600">{r.nama}</p>
                <div className="flex justify-center text-yellow-400 mb-1">
                  {[...Array(r.rating)].map((_, j) => (
                    <FaStar key={j} />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">“{r.komentar}”</p>
                <p className="text-xs text-gray-400 mt-1">{r.tanggal}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Form Review ===== */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-4">Tulis Ulasanmu</h3>
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-5 rounded-xl border shadow-sm"
        >
          <input
            type="text"
            placeholder="Nama kamu"
            value={newReview.nama}
            onChange={(e) =>
              setNewReview({ ...newReview, nama: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full mb-3 text-sm"
          />
          <textarea
            placeholder="Tulis pengalaman kamu..."
            value={newReview.komentar}
            onChange={(e) =>
              setNewReview({ ...newReview, komentar: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full mb-3 text-sm"
            rows={3}
          />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600">Rating:</span>
            {[1, 2, 3, 4, 5].map((r) => (
              <FaStar
                key={r}
                onClick={() => setNewReview({ ...newReview, rating: r })}
                className={`cursor-pointer ${
                  newReview.rating >= r
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-[#7BAD86] hover:bg-[#6b9875] text-white px-4 py-2 rounded-md text-sm"
          >
            Kirim Ulasan
          </button>
        </form>
      </div>

      {/* ===== Semua Review ===== */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Semua Ulasan</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada ulasan pengguna.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm font-semibold text-orange-600">
                  {review.nama}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  {review.rating} ⭐
                </p>
                <p className="text-sm text-gray-700">{review.komentar}</p>
                <p className="text-xs text-gray-400 mt-1">{review.tanggal}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Sumber Referensi ===== */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-2">Sumber Referensi</h3>
        <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
          {data.referensi.map((link, i) => (
            <li key={i}>
              <a href={link} target="_blank" rel="noreferrer">
                {new URL(link).hostname}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
