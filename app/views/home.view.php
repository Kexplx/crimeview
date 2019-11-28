<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home / CrimeView</title>
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
    <script src="assets/js/vendor/jquery-3.4.1.min.js"></script>
    <script src="assets/js/vendor/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/places.js@1.17.0"></script>
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>
    <script src="assets/js/vendor/leaflet-providers.js"></script>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap ">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="bg-shape">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">CrimeView</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Data Sources
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="https://leafletjs.com" target="_blank">Leaflet</a>
                            <a class="dropdown-item" href="https://www.opendatasoft.com/de" target="_blank">OpenDataSoft</a>
                            <a class="dropdown-item" href="https://nominatim.openstreetmap.org" target="_blank">Nominatim</a>
                            <a class="dropdown-item" href="https://www.bka.de/DE/Home/home_node.html" target="_blank">Bundeskriminalamt</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="https://github.com/georg-schwarz/open-data-service" target="_blank">Jvalue ODS</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/Kexplx/CrimeView" target="_blank">Github</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <section class="hero-banner">
        <div class="container">
            <div class="row align-items-center align-items-xl-center justify-content-between text-center text-md-left">
                <div class="col-md-6 col-lg-5 mb-5">
                    <h1>CrimeView </h1>
                    <p>CrimeView analyses your travel route and generates an overview of all german-counties
                        and their current crime rates you'll pass. </p>
                    <p>We retrieve our data from a variety of open data sources. Use the navbar above to check them out.</p>
                    <p>This project was built for the <a target="_blank" href="https://osr.cs.fau.de/teaching/specific/amse/">AMSE Course</a> at FAU.</p>
                </div>
                <div class="col-md-8 col-lg-7" style="text-align: center;">
                    <img class="main-img" src="assets/images/fau.png" alt="CrimeView Logo">
                </div>
            </div>
            <hr>
            <div class="row justify-content-between align-items-stretch" style="margin-bottom: 40px;">
                <div class="col-md-6 col-lg-5">
                    <h2>Submit route here</h2>
                    <p>
                        After a valid input, we'll display a map of your route and mark the counties on the way based on their current crime rate (CR).</p>
                    <p>Last years CR of county = <strong> Commited crimes / Population</strong>.</p>
                    <form id="formRoute" class="form-search " method="POST ">
                        <input id="inputFrom" required type="text " name="from" placeholder="Departure city">
                        <input id="inputTo" required type="text " name="to" placeholder="Destination city">
                        <button type="submit" id="buttonSubmit" class="btn btn-dark">Analyze</button>
                    </form>
                    <div id="containerCards">
                    </div>
                </div>
                <div class="map-content map-container col-md-8 col-lg-7">
                    <div id="container-spinner">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-dark" role="status" style="width: 6rem; height: 6rem;">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <p style="padding-top: 15px;">Loading route data...</p>
                    </div>
                    <div id="map-container">
                        <div id="osm_map"></div>
                    </div>
                    <div id="container-status-fail">
                        <img src="assets/images/warning.svg" alt="">
                        <p>Something went wrong. <br>
                            Please try again later with a valid input.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script type="text/javascript">
        $("#container-spinner").hide();
        $("#map-container").hide();
        $("#card-container").hide();
        $("#container-status-fail").hide();

        initPlacesApi();
        var map = null;
        var polyline;
        var lastSelectedCardId = "";
        var lastSelectedGeoJsonLayer;

        class County {
            constructor(geoJson, crimeRate, color) {
                this.geoJson = geoJson;
                this.crimeRate = crimeRate;
                this.color = color;
            }
        }

        $("#formRoute").submit(function(e) {
            e.preventDefault();
            showSearch();

            let from = $("#inputFrom").val();
            let to = $("#inputTo").val();
            fetch('/routeData' + '?from=' + from + '&to=' + to, {
                method: 'GET',
            }).then(data => {
                if (data.status != 200) {
                    showFail();
                    return;
                }

                data.json().then(json => {
                    initMap(json.from.city.lat, json.from.city.lon, json.to.city.lat, json.to.city.lon);
                    $(".map-container").append(
                        '<div class="card" id="cardRouteInformation">' +
                        '<div class="card-body ">' +
                        '<p class="card-text "> On your way from ' + $("#inputFrom").val().replace(/,.+,?$/g, '') + ' to ' + $("#inputTo").val().replace(/,.+,?$/g, '') + ' you will pass ' +
                        json.counties.length + ' german counties.</strong> The colors on the map stem from the counties crime rate (cr).</p>' +
                        '<p><span style="color:#27ae60">Green</span>: CR <= 0.04, ' +
                        '<span style="color:#ff7e29">Orange</span>: CR <= 0.07, ' +
                        '<span style="color:#c0392b">Red</span>: CR > 0.07</p>' +
                        '</div>' +
                        '</div>'
                    );

                    $("#containerCards").append(
                        '<div id="placeholderCard" class="card bg-light mb-3" style="text-align:center; height:290px; width:100%; margin-top:20px">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">Select a county on the map.</h5>' +
                        '<p>For each selection we\'ll display a counties crime rate and it\'s crime contribution</p>' +
                        '<img src="assets/images/select.svg" style="margin-top:30px; width:80px">' +
                        '</div>' +
                        '</div>'
                    );

                    lastSelectedCardId = "placeholderCard";

                    json.counties.forEach(element => {
                        let card_id = makeid(5);
                        L.geoJson($.parseJSON(element.county.geoJson), {
                                style: polystyle(getColorByCrimeRate(element.county.crimeStats.rate)),
                                onEachFeature: function(feature, layer) {
                                    layer.on({
                                        click: function(e) {
                                            if (lastSelectedGeoJsonLayer != null) {
                                                lastSelectedGeoJsonLayer.setStyle({
                                                    opacity: 0.4,
                                                    fillOpacity: 0.4
                                                });
                                            }

                                            layer.setStyle({
                                                opacity: 1,
                                                fillOpacity: 0.7
                                            });
                                            changeSelectedCounty(card_id);
                                            lastSelectedGeoJsonLayer = layer;
                                        }
                                    });
                                }
                            })
                            .addTo(map);

                        let dist_string = "<p>Last year's most common crimes.</p><ul>";
                        element.county.crimeStats.distribution.forEach(dist => {
                            dist_string += "<li>" + Object.keys(dist)[0].replace(/ §[^:]*/, '').replace(/:/, '') + ": " + Object.values(dist)[0] + "</li>";
                        });

                        $("#containerCards").append(
                            '<div id="' + card_id + '"class="card bg-light mb-3" style="width:100%; display:none; margin-top:20px">' +
                            '<div class="card-header">' + element.county.name + " - " + element.county.type + '</div>' +
                            '<div class="card-body">' +
                            '<h5 class="card-title">CR = <span style="color:' + getColorByCrimeRate(element.county.crimeStats.rate) + ';">' + element.county.crimeStats.rate + '</span></h5>' +
                            '<p class="card-text">' + dist_string + '</p>' +
                            '</div>' +
                            '</div>'
                        );
                    });
                    showSuccess();
                })
            });
        });

        function initPlacesApi() {
            var placesContainerDeparture = places({
                appId: "plXRD1IMI80E",
                apiKey: "00f22d317e3469a60acffe3d3e316f6f",
                container: document.querySelector('#inputTo'),
            });

            var placesContainerDestination = places({
                appId: "plXRD1IMI80E",
                apiKey: "00f22d317e3469a60acffe3d3e316f6f",
                container: document.querySelector('#inputFrom'),
            });

            const reconfigurableOptions = {
                countries: ['de'],
                type: 'city',
                aroundLatLngViaIP: false
            };

            placesContainerDeparture.configure(reconfigurableOptions);
            placesContainerDestination.configure(reconfigurableOptions);
        }

        function changeSelectedCounty(id) {
            if (lastSelectedCardId != "") {
                $("#" + lastSelectedCardId).hide();
            }

            $("#" + id).show();
            lastSelectedCardId = id;
        }

        function initMap(from_lat, from_lng, to_lat, to_lng) {
            if (map != null) {
                map.off();
                map.remove();
            }

            map = new L.map('osm_map', {
                zoomControl: false
            });

            map.invalidateSize();

            layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'OpenStreetMap',
                maxZoom: 13
            }).addTo(map);

            var blackIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            L.marker([from_lat, from_lng], {
                icon: blackIcon
            }).addTo(map);
            L.marker([to_lat, to_lng], {
                icon: blackIcon
            }).addTo(map);

            polyline = L.polyline([
                [from_lat, from_lng],
                [to_lat, to_lng]
            ]);

            polyline.setStyle({
                color: '#000',
                weight: 3,
                dashArray: "10 10",
                stroke: true,
            });

            polyline.bringToFront();

            polyline.addTo(map)
            map.fitBounds(polyline.getBounds());
        }

        function showSuccess() {
            $("#container-spinner").hide();
            $("#map-container").show();
            $('#buttonSubmit').attr("disabled", false);
            $("#container-status-fail").hide();
            goToByScroll("map-container");
            map.invalidateSize();
            map.fitBounds(polyline.getBounds());
        }

        function showFail() {
            $("#container-spinner").hide();
            $("#card-container").hide();
            $("#map-container").hide();
            $('#buttonSubmit').attr("disabled", false);
            $("#container-status-fail").show();
            $(".card").remove();
        }

        function showSearch() {
            $(".card").remove();
            $('#buttonSubmit').attr("disabled", true);
            $("#container-spinner").show();
            $("#card-container").hide();
            $("#map-container").hide();
            $("#container-status-fail").hide();
        }

        function polystyle(color) {
            return {
                fillColor: color,
                weight: 2,
                opacity: 0.4,
                color: '#fff',
                fillOpacity: 0.4
            };
        }

        function getColorByCrimeRate(crimeRate) {
            var x = crimeRate;
            switch (true) {
                case (crimeRate == 0):
                    return "#777";
                case (crimeRate <= 0.04):
                    return "#27ae60";
                case (crimeRate <= 0.07):
                    return "#ff7e29";
                default:
                    return "#c0392b";
            }
        }

        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function goToByScroll(id) {
            document.getElementById(id).scrollIntoView(true);
        }
    </script>
</body>

</html>