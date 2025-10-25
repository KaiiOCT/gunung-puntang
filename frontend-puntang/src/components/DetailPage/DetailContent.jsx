import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const DetailContent = () => {
  const { id } = useParams();
  const [point, setPoint] = useState(null);
  const [gambarUtama, setGambarUtama] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    nama: "",
    komentar: "",
    rating: 5,
  });

  // Ambil data point + review
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/points/show/${id}`);
      const data = res.data.data;

      setPoint(data);

      // Ambil daftar gambar
      const images = JSON.parse(data.image || "[]");
      if (images.length > 0) setGambarUtama(`http://127.0.0.1:8000/storage/${images[0]}`);

      // Set review
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Submit review baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.nama.trim() || !newReview.komentar.trim()) return;

    try {
      await axios.post(`http://127.0.0.1:8000/api/reviews`, {
        point_id: id,
        nama: newReview.nama,
        comment: newReview.komentar,
        rating: newReview.rating,
      });
      setNewReview({ nama: "", komentar: "", rating: 5 });
      fetchData(); // refresh semua data
    } catch (error) {
      console.error("Gagal kirim review:", error);
    }
  };

  if (!point) return <p className="text-center py-20">Loading...</p>;

  // Daftar gambar lengkap
  const gambarList = point.image
    ? JSON.parse(point.image).map((img) => `http://127.0.0.1:8000/storage/${img}`)
    : [];

  return (
    <div id="detail" className="max-w-5xl mx-auto px-6 md:px-14 py-24">
      {/* ===== Nama & Lokasi ===== */}
      <h2 className="text-2xl font-bold mb-4">{point.name}</h2>
      {point.address && (
        <p className="text-sm text-gray-600 mb-6">📍{point.address}</p>
      )}

      {/* ===== Card Gambar Utama & Thumbnail ===== */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-4 mx-auto flex flex-col items-center gap-4">
        {/* Gambar Utama */}
        <img
          src={gambarUtama || gambarList[0] || ""}
          alt="Gambar Utama"
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-xl shadow-md"
        />

        {/* Thumbnail */}
        {gambarList.length > 1 && (
          <div className="flex flex-wrap gap-4 justify-center w-full">
            {gambarList.slice(1, 5).map((src, index) => (
              <img
                key={index}
                src={src}
                onClick={() => setGambarUtama(src)}
                alt={`thumb-${index + 1}`}
                className={`w-32 h-20 sm:w-40 sm:h-24 object-cover rounded-xl cursor-pointer border-2 ${
                  gambarUtama === src
                    ? "border-orange-500 border-4"
                    : "border-transparent hover:border-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ===== Deskripsi ===== */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
        <p className="text-white text-sm leading-relaxed text-justify">
          {point.description}
        </p>
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
                className={`cursor-pointer text-lg transition ${
                  newReview.rating >= r
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"
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
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition text-sm"
              >
                <p className="font-semibold text-orange-600 mb-1">
                  {review.name ?? "Tidak Diketahui"}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailContent;
