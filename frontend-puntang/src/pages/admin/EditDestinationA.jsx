import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaHome, FaUserAlt, FaMountain } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDestinationA = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID dari URL

  // === State Form ===
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lon: "",
    address: "",
    description: "",
  });

  // === State untuk gambar ===
  const [image, setImages] = useState([null, null, null, null, null]);
  const [existingImages, setExistingImages] = useState([]); // Gambar lama dari server
  const [loading, setLoading] = useState(true);

  // === Fetch data berdasarkan ID ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/points/${id}`);
        const data = res.data.data;
        setFormData({
          name: data.name,
          lat: data.lat,
          lon: data.lon,
          address: data.address || "",
          description: data.description || "",
        });

        // Jika ada gambar lama
        if (data.image) {
          const parsedImages = JSON.parse(data.image);
          setExistingImages(parsedImages);
        }

        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data destinasi!");
        navigate("/destinationA");
      }
    };

    fetchData();
  }, [id, navigate]);

  // === Handle input teks ===
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // === Handle input gambar baru ===
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...image];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  // === Submit ke API update ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("lat", formData.lat);
      data.append("lon", formData.lon);
      data.append("address", formData.address);
      data.append("description", formData.description);

      // Kirim hanya file yang benar-benar baru
      image.forEach((img, index) => {
        if (img) {
          data.append(`image[${index}]`, img); // penting: kirim indexnya
        }
      });

      const res = await axios.post(
        `http://127.0.0.1:8000/api/points/update/${id}`,
        data
      );

      if (res.data.success) {
        alert("Destinasi berhasil diperbarui!");
        navigate("/destinationA");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui destinasi!");
    }
  };

  if (loading) return <h2 className="p-8 text-gray-600">Loading data...</h2>;

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
        <header className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 shadow">
          <h2 className="text-xl font-semibold">Edit Data Destinasi</h2>
          <a
            href="/destinationA"
            className="flex items-center gap-2 text-white hover:underline"
          >
            <IoMdArrowBack /> Kembali
          </a>
        </header>

        <form onSubmit={handleSubmit} className="px-12 py-8">
          <h1 className="text-2xl font-semibold text-green-800 mb-8">
            Perbarui Data Destinasi
          </h1>

          <div className="grid grid-cols-[1.4fr_1fr] gap-10">
            {/* === INPUT KIRI === */}
            <div>
              {["name", "address", "lat", "lon"].map((field) => (
                <div key={field} className="mt-5 first:mt-0">
                  <h1 className="font-medium text-sm text-gray-800 capitalize">
                    {field === "lat"
                      ? "Latitude Lokasi"
                      : field === "lon"
                      ? "Longitude Lokasi"
                      : field === "address"
                      ? "Alamat Lokasi"
                      : "Nama Lokasi"}
                  </h1>
                  <input
                    name={field}
                    type="text"
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 text-sm font-light text-gray-600 bg-[#FCFFF8] py-2 px-3 rounded-lg w-full border border-[#667554] focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              ))}

              <div className="mt-5">
                <h1 className="text-sm font-medium text-gray-800">Deskripsi</h1>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 text-sm font-light text-gray-600 bg-[#FCFFF8] py-2 px-3 rounded-lg w-full h-28 border border-[#667554] focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* === INPUT FOTO === */}
            <div>
              <h1 className="text-sm font-medium mb-2">Foto Lokasi</h1>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 5 }).map((_, i) => {
                  const preview =
                    image[i] !== null
                      ? URL.createObjectURL(image[i])
                      : existingImages[i]
                      ? `http://127.0.0.1:8000/storage/${existingImages[i]}`
                      : null;

                  return (
                    <label
                      key={i}
                      className="bg-[#D9D9D9] w-28 h-28 rounded-lg flex items-center justify-center hover:bg-gray-300 transition cursor-pointer relative overflow-hidden"
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt={`Preview ${i}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <FaPlus size={28} className="text-gray-700" />
                      )}

                      <input
                        type="file"
                        name="image[]"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleFileChange(e, i)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              className="mt-8 w-full py-2 rounded-xl bg-[#E17823] hover:bg-[#d66b1c] text-white font-medium text-sm shadow-md transition-all"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditDestinationA;
