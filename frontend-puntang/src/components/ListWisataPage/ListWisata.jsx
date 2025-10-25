import React from "react";
import axios from "axios";
import useSWR from "swr";
import { Link } from "react-router-dom";

const ListWisata = () => {
  const fetcher = async () => {
    const response = await axios.get("http://localhost:8000/api/points");
    return response.data.data;
  };

  const { data = [] } = useSWR("points", fetcher);

  return (
    <div
      id="listWisata"
      className="max-w-6xl mx-auto px-4 sm:px-6 md:px-14 py-14"
    >
      <h2 className="text-2xl font-bold mb-4">Destinasi</h2>
      <p className="text-sm text-gray-600 mb-6">
        Beberapa destinasi yang terdapat di Gunung Puntang menawarkan pengalaman
        wisata yang menyatu dengan alam dan cocok untuk melepas penat dari
        rutinitas sehari-hari.
      </p>

      {/* grid dengan tinggi card seragam */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {data.map((points) => (
          <div
            key={points.id}
            className="rounded-xl overflow-hidden shadow-lg w-full max-w-sm bg-white flex flex-col h-[450px]"
          >
            {/* bagian gambar dengan tinggi tetap */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${JSON.parse(points.image)[0]}`}
                alt={points.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* bagian isi card */}
            <div className="flex flex-col justify-between flex-grow p-4">
              <div>
                <h3 className="text-base font-semibold mb-2 text-gray-800 line-clamp-1">
                  {points.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[60px]">
                  {(typeof points.description === "string"
                    ? points.description.slice(0, 100)
                    : "Tidak ada deskripsi") + "..."}
                </p>
              </div>

              <div className="flex justify-end mt-auto">
                <Link to={`/detail-destination/${points.id}`}>
                  <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition-all">
                    Selengkapnya
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListWisata;
