<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Peta Digital Gunung Puntang</title>

    {{-- Leaflet CSS --}}
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

    <style>
        * { box-sizing: border-box; }

        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            color: #37474F;
        }

        header {
            background-color: #2E7D32;
            color: #fff;
            padding: 15px;
            text-align: center;
            font-size: 1.6rem;
            font-weight: bold;
            letter-spacing: 1px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .container {
            display: flex;
            flex-direction: row;
            height: calc(100% - 60px);
        }

        #map {
            flex: 1;
            height: 100%;
        }

        .custom-tooltip {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            color: #000000;
            font-weight: bold;
            text-shadow: 1px 1px 2px white;
            text-wrap: wrap;
            text-align: center;
        }

        #sidebar {
            width: 380px;
            background-color: #A5D6A7;
            display: flex;
            flex-direction: column;
            border-left: 1px solid #ddd;
            height: 100%;
        }

        .custom-user-icon .user-circle {
            width: 20px;
            height: 20px;
            background: rgba(0, 123, 255, 0.8);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 6px rgba(0, 123, 255, 0.9);
            position: relative;
        }

        .custom-user-icon .user-circle::after {
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 6px solid rgba(0, 123, 255, 0.8);
        }

        #sidebar h3 {
            margin: 0;
            padding: 10px;
            background: #4CAF50;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            border-bottom: 2px solid #388E3C;
        }

        #search-box {
            width: 90%;
            padding: 8px;
            margin: 10px auto;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
            font-size: 14px;
        }

        #search-box:focus {
            border-color: #4CAF50;
            box-shadow: 0 0 4px rgba(76, 175, 80, 0.6);
        }

        ul#point-list {
            list-style: none;
            padding: 10px;
            margin: 0;
            overflow-y: auto;
            flex: 1;
        }

        #point-list li {
            margin-bottom: 8px;
            padding: 10px;
            background-color: #ffffff;
            border: 1px solid #ccc;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
        }

        #point-list li:hover {
            background: #E8F5E9;
            transform: scale(1.02);
        }

        #point-info {
            background: #C8E6C9;
            padding: 10px;
            border-top: 1px solid #bbb;
            flex: 1;
            overflow: auto;
        }

        #point-info img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin-top: 5px;
        }

        #point-info p {
            margin: 8px 0 0;
        }

        #distance-display {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 14px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-weight: bold;
            color: #2E7D32;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }

            #map {
                height: 60%;
                width: 100%;
            }

            #sidebar {
                width: 100%;
                height: 40%;
                border-left: none;
                border-top: 1px solid #ddd;
            }
        }
    </style>
</head>

<body>
    <header>Peta Digital Gunung Puntang</header>

    <div class="container">
        <div id="map"></div>
        <div id="distance-display"></div>

        <div id="sidebar">
            <h3>Cari lokasi</h3>
            <input type="text" id="search-box" placeholder="Cari lokasi...">
            <ul id="point-list"></ul>
            <div id="point-info"></div>
        </div>
    </div>

    {{-- Leaflet JS --}}
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>
