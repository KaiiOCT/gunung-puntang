const Lokasi = () => {
  return (
    <div className="flex flex-col justify-center items-center my-14 px-6 sm:px-10 md:px-14">
      <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 text-center">
        Lokasi Kami
      </h1>
      <div className="w-full max-w-5xl mt-6 aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://maps.google.com/maps?q=Gunung%20Puntang&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          allowFullScreen=""
        />
      </div>
    </div>
  );
};

export default Lokasi;
