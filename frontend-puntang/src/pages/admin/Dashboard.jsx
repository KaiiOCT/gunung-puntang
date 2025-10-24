import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";
import { FaMountain } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";

const DashboardA = () => {
  // Data dummy
  const ratingTrend = [
    { month: "Jan", rating: 3.8 },
    { month: "Feb", rating: 4.0 },
    { month: "Mar", rating: 4.3 },
    { month: "Apr", rating: 4.1 },
    { month: "Mei", rating: 4.5 },
    { month: "Jun", rating: 4.0 },
    { month: "Jul", rating: 4.6 },
  ];

  const popularDestinations = [
    { name: "Cafe Barong", value: 580 },
    { name: "Curug", value: 460 },
    { name: "Goa Belanda", value: 380 },
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
            <a href="/dashboardA" className="flex items-center gap-3 p-2 rounded-lg bg-green-800">
              <FaHome /> Dashboard
            </a>
            <a href="/aboutA" className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-800 transition">
              <MdLocationOn /> Tentang Kami
            </a>
            <a href="/destinationA" className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-800 transition">
              <FaUserAlt /> Destinasi
            </a>
            <a href="/reviewA" className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-800 transition">
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
          <a href="/" className="flex items-center gap-2 text-white hover:underline">
            <IoMdArrowBack /> Kembali
          </a>
        </header>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-2">Dashboard</h3>
          <p className="mb-6">Halo Admin, Selamat datang di dashboard Gunung Puntang!</p>

          {/* Statistik Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Total Destinasi</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">10</h4>
            </div>

            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Total Review</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">68</h4>
            </div>

            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Rata-rata Rating</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">4.5</h4>
            </div>

            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Total Pengunjung</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">932</h4>
            </div>
          </div>

          {/* Grafik Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tren Rating */}
            <div className="bg-white p-6 rounded-xl shadow border border-green-200">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Tren Rating (Bulanan)</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={ratingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[3, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rating" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Destinasi Populer */}
            <div className="bg-white p-6 rounded-xl shadow border border-green-200">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Destinasi Paling Populer</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart layout="vertical" data={popularDestinations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardA;
