// ✅ Simpan 1 review baru berdasarkan destinasi
export const saveReview = (destinationId, reviewData) => {
  const key = `reviews_${destinationId}`;
  const current = JSON.parse(localStorage.getItem(key)) || [];

  const newReview = {
    ...reviewData,
    id: Date.now(), // biar unik
  };

  const updated = [...current, newReview];
  localStorage.setItem(key, JSON.stringify(updated));
};

// ✅ Ambil semua review untuk destinasi tertentu
export const getReviewsByDestination = (destinationId) => {
  const key = `reviews_${destinationId}`;
  return JSON.parse(localStorage.getItem(key)) || [];
};

// ✅ Ambil semua review dari semua destinasi (buat admin)
export const getAllReviews = () => {
  const allKeys = Object.keys(localStorage).filter((k) =>
    k.startsWith("reviews_")
  );

  let allReviews = [];

  allKeys.forEach((key) => {
    const destinationId = key.replace("reviews_", "");
    const reviews = JSON.parse(localStorage.getItem(key)) || [];
    const destinasiName = getDestinationName(destinationId);

    reviews.forEach((r) =>
      allReviews.push({
        ...r,
        destinationId,
        namaDestinasi: destinasiName,
      })
    );
  });

  return allReviews;
};

// ✅ Hapus 1 review berdasarkan ID & destinasi
export const deleteReview = (destinationId, reviewId) => {
  const key = `reviews_${destinationId}`;
  const current = JSON.parse(localStorage.getItem(key)) || [];
  const updated = current.filter((r) => r.id !== reviewId);
  localStorage.setItem(key, JSON.stringify(updated));
};

// ✅ (Opsional) Hapus semua review destinasi tertentu
export const clearReviews = (destinationId) => {
  const key = `reviews_${destinationId}`;
  localStorage.removeItem(key);
};

// ✅ Mapping destinasi ID → nama destinasi
const getDestinationName = (id) => {
  const mapping = {
    1: "Gunung Puntang",
    2: "Curug",
    3: "Cafe Berg",
    4: "Campsite",
    5: "Edu Wisata Kopi",
    6: "Gua Belanda",
    7: "Kopi Puntang",
    8: "Owa Jawa",
    9: "Sungai Cigereuh",
    about: "Tentang Kami",
  };
  return mapping[id] || "Tidak Diketahui";
};
