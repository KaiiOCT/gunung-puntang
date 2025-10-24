import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GunungImg from "../../assets/gunung 1.png"; // pastikan path benar

const LoginA = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Dummy login check ---
    if (username === "admin" && password === "12345") {
      localStorage.setItem("isLoggedIn", "true"); // simpan status login
      navigate("/dashboardA"); // redirect ke dashboard
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Background Image) */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${GunungImg})`, // ✅ pakai variabel import
        }}
      ></div>

      {/* Right Side (Login Form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gradient-to-br from-green-300 to-green-600">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
            Selamat Datang Admin!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <a href="#" className="text-green-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginA;
