import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaHome, FaUserAlt, FaMountain } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { FaFilter, FaTrashAlt, FaStar } from "react-icons/fa";
import { getAllReviews, deleteReview } from "../../utils/localReview";

const ReviewUserA = () => {
  const [reviews, setReviews] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDestinasi, setSelectedDestinasi] = useState([]);

  const destinasiList = [
    "Curug",
    "Cafe Berg",
    "Campsite",
    "Edu Wisata Kopi",
    "Gua Belanda",
    "Gunung Puntang",
    "Kopi Puntang",
    "Owa Jawa",
    "Sungai Cigereuh",
  ];

  // 🔹 Ambil data review dari localStorage
  useEffect(() => {
    const storedReviews = getAllReviews();
    setReviews(storedReviews);
  }, []);

  const toggleFilter = () => setFilterOpen(!filterOpen);

  const handleFilterChange = (dest) => {
    if (selectedDestinasi.includes(dest)) {
      setSelectedDestinasi(selectedDestinasi.filter((d) => d !== dest));
    } else {
      setSelectedDestinasi([...selectedDestinasi, dest]);
    }
  };

  // 🔹 Filter review berdasarkan destinasi
  const filteredData = reviews.filter((item) =>
    selectedDestinasi.includes(item.namaDestinasi || item.destinasi || "")
  );

  // 🔹 Hapus review dari localStorage + state
  const handleDelete = (reviewId, destinationId) => {
    if (window.confirm("Yakin ingin menghapus review ini?")) {
      deleteReview(destinationId, reviewId);
      setReviews(getAllReviews());
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-green-600 text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 p-5 border-b border-green-500">
            <FaMountain size={32} />
            <h1 className="font-bold text-lg">Gunung Puntang</h1>
          </div>

          <nav className="flex flex-col mt-6 space-y-3 px-4">
            <a
              href="/dashboardA"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-800 transition"
            >
              <FaHome /> Dashboard
            </a>
            <a
              href="/aboutA"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-800 transition"
            >
              <MdLocationOn /> Tentang Kami
            </a>
            <a
              href="/destinationA"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-800 transition"
            >
              <FaUserAlt /> Destinasi
            </a>
            <a
              href="/reviewA"
              className="flex items-center gap-3 p-2 rounded-lg bg-green-800"
            >
              <BsChatDotsFill /> Review User
            </a>
          </nav>
        </div>

        <div className="p-4 text-sm text-center opacity-80">
          © 2025 Gunung Puntang
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 shadow">
          <h2 className="text-xl font-semibold">Halaman Admin</h2>
          <a
            href="/dashboardA"
            className="flex items-center gap-2 text-white hover:underline"
          >
            <IoMdArrowBack /> Kembali
          </a>
        </header>

        {/* Konten */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            Review User:
          </h3>

          {/* Filter */}
          <div className="relative inline-block mb-8">
            <button
              onClick={toggleFilter}
              className="flex items-center gap-2 bg-[#F7A440] hover:bg-[#e59536] text-white px-4 py-2 rounded-md"
            >
              <FaFilter /> Filter data
            </button>

            {filterOpen && (
              <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 w-48 border border-gray-200">
                {destinasiList.map((dest) => (
                  <label
                    key={dest}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDestinasi.includes(dest)}
                      onChange={() => handleFilterChange(dest)}
                    />
                    <span className="text-sm text-gray-700">{dest}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Review Cards */}
          {filteredData.length === 0 ? (
            <p className="text-gray-500">Belum ada review dari user.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((user, i) => (
                <div
                  key={user.id}
                  className="bg-white rounded-xl shadow border border-gray-200 p-5 relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
                    <h3 className="font-semibold text-gray-800">{user.nama}</h3>
                    <div className="flex text-yellow-500 mt-1">
                      {[...Array(user.rating)].map((_, j) => (
                        <FaStar key={j} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center line-clamp-2">
                      "{user.komentar}"
                    </p>
                  </div>

                  {/* Tombol hapus */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() =>
                        handleDelete(user.id, user.destinationId)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  <div
                    className="mt-4 text-center text-xs font-medium text-white px-3 py-1 rounded-full w-fit mx-auto"
                    style={{
                      backgroundColor:
                        ["#F9E56B", "#F7C6C7", "#F9A785", "#B7E4C7"][i % 4],
                    }}
                  >
                    {user.namaDestinasi || user.destinasi || "Tidak Diketahui"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReviewUserA;
