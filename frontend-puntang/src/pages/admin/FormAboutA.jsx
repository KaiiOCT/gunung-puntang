import React, { useState } from "react";
import { FaMountain, FaHome, FaUserAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const FormAboutA = () => {
  const [images, setImages] = useState([null, null, null, null]);

  // handle upload gambar
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* === Sidebar === */}
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
              className="flex items-center gap-3 p-2 rounded-lg bg-green-800"
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
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-800 transition"
            >
              <BsChatDotsFill /> Review User
            </a>
          </nav>
        </div>

        <div className="p-4 text-sm text-center opacity-80">
          © 2025 Gunung Puntang
        </div>
      </aside>

      {/* === Main Content === */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 shadow">
          <h2 className="text-xl font-semibold">Halaman Admin</h2>
          <a
            href="/aboutA"
            className="flex items-center gap-2 text-white hover:underline"
          >
            <IoMdArrowBack /> Kembali
          </a>
        </header>

        {/* === Form Section === */}
        <div className="px-12 py-8">
          <h1 className="text-2xl font-semibold text-green-800 mb-8">
            Pilih Konten Berikut untuk Menambah Data:
          </h1>

          <div className="grid grid-cols-[1.5fr_1fr] gap-12">
            {/* ==== Left Form ==== */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Keterangan Lokasi
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lokasi"
                  className="w-full h-10 border border-green-700 bg-[#FCFFF8] rounded-lg px-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Alamat Lokasi
                </label>
                <input
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  className="w-full h-10 border border-green-700 bg-[#FCFFF8] rounded-lg px-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  rows="5"
                  placeholder="Tulis deskripsi tentang lokasi..."
                  className="w-full border border-green-700 bg-[#FCFFF8] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* ==== Right Upload Section ==== */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Foto Lokasi
              </label>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {images.map((img, index) => (
                  <label
                    key={index}
                    className="relative w-36 h-36 bg-gray-200 border border-green-700 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-300 transition"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`Foto ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaPlus size={35} className="text-green-700" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                  </label>
                ))}
              </div>

              <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-8 rounded-lg shadow-md transition">
                Posting Konten
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormAboutA;
