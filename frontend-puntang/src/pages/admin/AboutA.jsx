import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaHome, FaUserAlt, FaMountain } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import Dummy2 from "../../assets/gunung 1.png";

const AboutA = () => {
  const dataTentangKami = [
    {
      id: 1,
      nama: "Gunung Puntang",
      lokasi: "Mekarjaya, Kec. Banjaran, Kabupaten Bandung, Jawa Barat",
      deskripsi:
        "Destinasi wisata alam terbaik untuk menjelajahi jejak kolonialisme di antara kemegahan alam dengan hawa dan udara terasa sangat sejuk.",
      gambar: Dummy2,
    },
  ];

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

        <div className="p-4 text-sm text-center opacity-80">© 2025 Gunung Puntang</div>
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

        {/* Konten Utama */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            Konten Tentang Kami
          </h3>
          <p className="mb-4 text-gray-700">Kelola data profil Gunung Puntang</p>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mb-8 transition">
            <a href="/formAbout">Tambah Data</a>
          </button>

          {/* Card Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTentangKami.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow border border-green-200"
              >
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <h1 className="font-semibold text-green-800 text-lg">
                      {item.nama}
                    </h1>
                    <h3 className="text-gray-500 text-sm">{item.lokasi}</h3>
                    <p className="text-sm text-gray-700 font-light line-clamp-4">
                      {item.deskripsi}
                    </p>
                  </div>
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-[168px] h-[134px] object-cover rounded-lg"
                  />
                </div>

                <div className="mt-5 flex gap-4 justify-center">
                  <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-24 py-2 rounded-full text-sm font-medium transition">
                    Hapus
                  </button>
                  <button className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white w-24 py-2 rounded-full text-sm font-medium transition">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutA;
