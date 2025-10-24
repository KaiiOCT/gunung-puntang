import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListWisata = () => {
  const [dataDestinasi, setDataDestinasi] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/data-puntang.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setDataDestinasi(data);
    } catch (error) {
      console.error("Error mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataDestinasi.length === 0)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div
      id="listWisata"
      className="max-w-5xl mx-auto px-4 sm:px-6 md:px-14 py-14"
    >
      <h2 className="text-2xl font-bold mb-4">Destinasi</h2>
      <p className="text-sm text-gray-600 mb-6">
        Beberapa destinasi yang terdapat di Gunung Puntang menawarkan pengalaman
        wisata yang menyatu dengan alam dan cocok untuk melepas penat dari
        rutinitas sehari-hari.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center">
        {dataDestinasi.map((destinasi) => (
          <div
            key={destinasi.id}
            className="rounded-lg overflow-hidden shadow-lg w-full max-w-sm bg-white"
          >
            <img
              src={destinasi.gambarList?.[0]}
              alt={destinasi.nama}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{destinasi.nama}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {destinasi.deskripsi.slice(0, 100)}...
              </p>
              <div className="flex justify-end">
                <Link to={`/detail-destination/${destinasi.id}`}>
                  <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600">
                    selengkapnya
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
