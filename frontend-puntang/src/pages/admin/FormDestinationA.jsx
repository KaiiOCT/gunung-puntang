import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaHome, FaUserAlt, FaMountain } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const FormDestinationA = () => {
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
              className="flex items-center gap-3 p-2 rounded-lg bg-green-800"
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 shadow">
          <h2 className="text-xl font-semibold">Form Tambah Destinasi</h2>
          <a
            href="/destinationA"
            className="flex items-center gap-2 text-white hover:underline"
          >
            <IoMdArrowBack /> Kembali
          </a>
        </header>

        {/* Konten Form */}
        <div className="px-12 py-8">
          <h1 className="text-2xl font-semibold text-green-800 mb-8">
            Tambahkan Data Destinasi
          </h1>

          <div className="grid grid-cols-[1.4fr_1fr] gap-10">
            {/* === INPUT KIRI === */}
            <div>
              {/* Keterangan Lokasi */}
              <div>
                <h1 className="font-medium text-sm">Keterangan Lokasi</h1>
                <input
                  type="text"
                  className="mt-1 text-sm font-light text-gray-600 bg-[#FCFFF8] py-2 px-3 rounded-lg w-full border border-[#667554] focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Alamat Lokasi */}
              <div className="mt-5">
                <h1 className="font-medium text-sm">Alamat Lokasi</h1>
                <input
                  type="text"
                  className="mt-1 text-sm font-light text-gray-600 bg-[#FCFFF8] py-2 px-3 rounded-lg w-full border border-[#667554] focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Deskripsi */}
              <div className="mt-5">
                <h1 className="text-sm font-medium">Deskripsi</h1>
                <textarea
                  className="mt-1 text-sm font-light text-gray-600 bg-[#FCFFF8] py-2 px-3 rounded-lg w-full h-28 border border-[#667554] focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Informasi Tambahan */}
              <div className="mt-5">
                <h1 className="text-sm font-medium">Informasi Tambahan</h1>
                <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={i >= 2 ? "*Opsional" : ""}
                      className="mt-1 text-sm font-light text-gray-600 bg-[#FCFFF8] py-2 px-3 rounded-lg w-full border border-[#667554] focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              {/* Sumber Referensi */}
              <div className="mt-5">
                <h1 className="text-sm font-medium">Sumber Referensi</h1>
                <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={i >= 2 ? "*Opsional" : ""}
                      className="mt-1 text-sm font-light text-gray-600 bg-[#FCFFF8] py-2 px-3 rounded-lg w-full border border-[#667554] focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              {/* Tombol Posting */}
              <button className="mt-8 w-full py-2 rounded-xl bg-[#E17823] hover:bg-[#d66b1c] text-white font-medium text-sm shadow-md transition-all">
                Posting Konten
              </button>
            </div>

            {/* === INPUT FOTO === */}
            <div>
              <h1 className="text-sm font-medium mb-2">Foto Lokasi</h1>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <button
                    key={i}
                    className="bg-[#D9D9D9] w-32 h-32 rounded-lg flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <FaPlus size={35} className="text-gray-700" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormDestinationA;
