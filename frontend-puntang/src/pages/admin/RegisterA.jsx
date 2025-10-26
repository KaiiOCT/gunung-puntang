import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GunungImg from "../../assets/gunung 1.png"; // pastikan path benar

const RegisterA = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username dan password harus diisi!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          role: "admin", // sesuai dengan validasi Laravel
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/loginA");
      } else {
        // Jika validasi Laravel gagal
        alert(data.message || "Registrasi gagal. Periksa input Anda.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Background Image) */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${GunungImg})`,
        }}
      ></div>

      {/* Right Side (Register Form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gradient-to-br from-green-300 to-green-600">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
            Register Admin
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading ? "Mendaftarkan..." : "Register"}
            </button>

            <p className="text-sm text-center mt-3">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/loginA")}
                className="text-green-700 hover:underline"
              >
                Login di sini
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterA;
