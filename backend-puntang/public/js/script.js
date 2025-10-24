

let userPosition = null;
let routeLayer = null;
const pointInfoElement = document.getElementById('point-info');
const searchBox = document.getElementById('search-box');
const pointList = document.getElementById('point-list');
let allPoints = [];

let curugCoord = null;
let startPointCoord = null;


const ORS_API_KEY = "5b3ce3597851110001cf6248b07275209872495c8a503a8e8a110de3";

// Inisialisasi map Leaflet
const map = L.map('map').setView([-7.113577, 107.602738], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    userPosition = [position.coords.latitude, position.coords.longitude];

    const userIcon = L.divIcon({
      className: 'custom-user-icon',
      html: '<div class="user-circle"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker(userPosition, { icon: userIcon }).addTo(map).bindPopup("Lokasi Saya").openPopup();
    map.setView(userPosition, 15);
  }, () => {
    console.warn("Gagal mengambil lokasi pengguna.");
  });
}

let specialPointsCoords = [];

fetch('/get_points')
  .then(res => res.json())
  .then(data => {
    let markers = [];
    data.forEach(point => {
      const lat = parseFloat(point.lat);
      const lon = parseFloat(point.lon);
      allPoints.push({ ...point, lat, lon });

      // const namesToSave = [
      //   "Start Point",
      //   "Jalan Menuju curug",
      //   "Jalan Menuju curug 2",
      //   "Jalan Menuju curug 3",
      //   "Jalan Menuju curug 4",
      //   "pertigaan menuju curug (lurus / ke kiri bukan ke kanan)",
      //   "Curug Cikahuripan"
      // ];
      // if (namesToSave.includes(point.name)) {
      //   specialPointsCoords.push([lat, lon]);
      // }
      // if (point.name === "Curug Cikahuripan") {
      //   curugCoord = [lat, lon];
      // }
      // if (point.name === "Start Point") {
      //   startPointCoord = [lat, lon];
      // }


      // const hiddenMarkers = [
      //   "Jalan Menuju curug",
      //   "Jalan Menuju curug 2",
      //   "Jalan Menuju curug 3",
      //   "Jalan Menuju curug 4"
      // ];
      // if (hiddenMarkers.includes(point.name)) {
      //   return;
      // }

      const marker = L.marker([lat, lon]).addTo(map);
      marker.bindPopup(`<b>${point.name}</b>`);
      marker.bindTooltip(point.name, {
        permanent: true,
        direction: 'bottom',
        offset: [0, 10],
        className: 'custom-tooltip'
      });
      markers.push(marker);

      marker.on('click', () => {
        map.setView([lat, lon], 16);
        updatePointInfo(point);
        showRouteTo(lat, lon);
      });      
    });
    map.on('zoomend', () => {
        const currentZoom = map.getZoom();
      
        markers.forEach(marker => {
          if (currentZoom >= 16) {
            marker.openTooltip();
          } else {
            marker.closeTooltip();
          }
        });
      });

    console.log("Koordinat titik khusus:", specialPointsCoords);



    renderPointList(allPoints);
  })
  .catch(err => {
    console.error("Gagal mengambil data dari server:", err);
  });

function showRouteTo(destLat, destLon) {
  if (!userPosition) {
    alert("Lokasi pengguna belum tersedia.");
    return;
  }

  if (curugCoord && startPointCoord &&
    destLat === curugCoord[0] && destLon === curugCoord[1]) {
    [destLat, destLon] = startPointCoord;
    var polyline = L.polyline(specialPointsCoords, { color: 'blue' }).addTo(map);
    map.fitBounds(polyline.getBounds());
  }


  // OpenRouteService butuh [lon, lat]
  const origin = [userPosition[1], userPosition[0]];
  const destination = [destLon, destLat];

  fetch('https://api.openrouteservice.org/v2/directions/foot-walking/geojson', {
    method: 'POST',
    headers: {
      'Authorization': ORS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ coordinates: [origin, destination] })
  })
    .then(res => res.json())
    .then(data => {
      if (routeLayer) map.removeLayer(routeLayer);
      routeLayer = L.geoJSON(data, {
        style: { color: 'blue', weight: 4 }
      }).addTo(map);
      map.fitBounds(routeLayer.getBounds());

      const dist = data.features[0].properties.summary.distance;
      const distanceDisplay = document.getElementById('distance-display');
      if (distanceDisplay) {
        distanceDisplay.innerHTML =
          `Jarak ke tujuan: <strong>${(dist / 1000).toFixed(2)} km</strong>`;
      }
    })
    .catch(err => console.error("Gagal mengambil rute:", err));
}

function updatePointInfo(point) {
  let html = `<strong>${point.name}</strong>`;
  if (point.image) html += `<br><img src="/storage/${point.image}" alt="${point.name}" width="300">`;
  if (point.description) html += `<p>${point.description}</p>`;
  pointInfoElement.innerHTML = html;
}

function renderPointList(points) {
  pointList.innerHTML = '';
  if (points.length === 0) {
    pointList.innerHTML = '<li>Tidak ditemukan.</li>';
    return;
  }

  points.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.name;
    li.addEventListener('click', () => {
      map.setView([p.lat, p.lon], 16);
      updatePointInfo(p);

      showRouteTo(p.lat, p.lon);

    });
    pointList.appendChild(li);
  });
}

searchBox.addEventListener('input', e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = allPoints.filter(p => p.name.toLowerCase().includes(keyword));
  renderPointList(filtered);
});
