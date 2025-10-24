import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const DetailContent = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [gambarUtama, setGambarUtama] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    nama: "",
    komentar: "",
    rating: 5,
  });

  // === Ambil data destinasi ===
  const fetchData = async () => {
    try {
      const response = await fetch("/data-puntang.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const datas = await response.json();
      const detailItem = datas.find((item) => item.id.toString() === id);
      if (!detailItem) throw new Error(`Data dengan ID ${id} tidak ditemukan`);

      setData(detailItem);
      setGambarUtama(detailItem.gambarList[0]);

      // Ambil review dari localStorage
      const saved = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
      setReviews(saved);
    } catch (error) {
      console.error("Error mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // === Simpan ke localStorage setiap ada perubahan review ===
  useEffect(() => {
    if (reviews.length >= 0) {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
    }
  }, [reviews, id]);

  // === Tambah review baru ===
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.nama.trim() || !newReview.komentar.trim()) return;

    const reviewBaru = {
      id: Date.now(),
      destinationId: id,
      nama: newReview.nama,
      komentar: newReview.komentar,
      rating: newReview.rating,
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };

    setReviews([...reviews, reviewBaru]);
    setNewReview({ nama: "", komentar: "", rating: 5 });
  };

  if (!data) return <p>Loading...</p>;

  // Ambil 2 review rating tertinggi
  const topReviews = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 2);

  return (
    <div id="detail" className="max-w-5xl mx-auto px-6 md:px-14 py-24">
      {/* ===== Nama & Lokasi ===== */}
      <h2 className="text-2xl font-bold mb-4">{data.nama}</h2>
      <p className="text-sm text-gray-600 mb-6">📍{data.lokasi}</p>

      {/* ===== Gambar Utama & Thumbnail ===== */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={gambarUtama}
          alt="Gambar Utama"
          className="w-full max-w-3xl h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-xl shadow-lg"
        />
        <div className="flex flex-wrap gap-4 justify-center w-full max-w-3xl">
          {data.gambarList.map((src, index) => (
            <img
              key={index}
              src={src}
              onClick={() => setGambarUtama(src)}
              alt={`thumb-${index}`}
              className={`w-32 h-20 sm:w-40 sm:h-24 object-cover rounded-xl cursor-pointer border-2 ${
                gambarUtama === src
                  ? "border-orange-500 border-4"
                  : "border-transparent hover:border-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== Deskripsi ===== */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
        <p className="text-gray-800 text-sm leading-relaxed text-justify">
          {data.deskripsi}
        </p>

        <h3 className="text-lg font-semibold mt-10 mb-2">Informasi tambahan</h3>
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          <p>{data.jam_operasional}</p>
          <p>{data.harga}</p>
        </div>

        <h3 className="text-lg font-semibold mt-10 mb-2">Sumber referensi</h3>
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

      {/* ===== Top Review ===== */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-4">Top Reviews</h3>
        {topReviews.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada ulasan.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {topReviews.map((r) => (
              <div
                key={r.id}
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
                onClick={() =>
                  setNewReview({ ...newReview, rating: r })
                }
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
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm font-semibold text-orange-600">
                  {review.nama}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  {review.rating} ⭐
                </p>
                <p className="text-sm text-gray-700">{review.komentar}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {review.tanggal}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailContent;
