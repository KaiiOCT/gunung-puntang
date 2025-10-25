import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import { FaMountain, FaHome, FaUserAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";

const DashboardA = () => {
  const [totalDestinasi, setTotalDestinasi] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingTrend, setRatingTrend] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          destinasiRes,
          reviewRes,
          avgRes,
          trendRes,
          popularRes
        ] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/points/count"),
          fetch("http://127.0.0.1:8000/api/reviews/count"),
          fetch("http://127.0.0.1:8000/api/reviews/avg-all-ratings"),
          fetch("http://127.0.0.1:8000/api/reviews/trend"),
          fetch("http://127.0.0.1:8000/api/reviews/top-visitors")
        ]);

        const destinasiData = await destinasiRes.json();
        const reviewData = await reviewRes.json();
        const avgData = await avgRes.json();
        const trendData = await trendRes.json();
        const popularData = await popularRes.json();

        if (destinasiData?.success) setTotalDestinasi(destinasiData.data);
        if (reviewData?.success) setTotalReview(reviewData.data);
        if (avgData?.success) setAvgRating(avgData.data.average_rating);
        if (trendData?.success) setRatingTrend(trendData.data);
        if (popularData?.success)
          setPopularDestinations(
            popularData.data.map(item => ({
              name: item.name,
              value: item.total_visitors
            }))
          );
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-green-700 text-xl font-semibold">
        Memuat data...
      </div>
    );
  }

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
        <header className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 shadow">
          <h2 className="text-xl font-semibold">Halaman Admin</h2>
          <a href="/" className="flex items-center gap-2 text-white hover:underline">
            <IoMdArrowBack /> Kembali
          </a>
        </header>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-2">Dashboard</h3>
          <p className="mb-6">Halo Admin, Selamat datang di dashboard Gunung Puntang!</p>

          {/* Statistik Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Total Destinasi</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">{totalDestinasi}</h4>
            </div>

            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Total Review</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">{totalReview}</h4>
            </div>

            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Rata-rata Rating</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">{avgRating}</h4>
            </div>

            <div className="bg-green-100 p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-sm">Total Pengunjung (Top 3)</p>
              <h4 className="text-3xl font-bold text-green-800 mt-2">
                {popularDestinations.reduce((a, b) => a + b.value, 0)}
              </h4>
            </div>
          </div>

          {/* Grafik Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Grafik Tren Rating */}
            <div className="bg-white p-6 rounded-xl shadow border border-green-200">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Tren Rating (Bulanan)</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={ratingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[3, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avg_rating" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Grafik Destinasi Populer */}
            <div className="bg-white p-6 rounded-xl shadow border border-green-200">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Destinasi Paling Populer</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart layout="vertical" data={popularDestinations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} />=
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
