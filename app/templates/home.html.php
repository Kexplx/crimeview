<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home / CrimeView</title>
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
    <script src="assets/js/vendor/jquery-3.4.1.min.js"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>
    <script src="assets/js/vendor/leaflet-providers.js"></script>
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>
    <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap ">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="bg-shape">
    <section class="hero-banner">
        <div class="container">
            <div class="row align-items-center align-items-xl-center justify-content-between text-center text-md-left">
                <div class="col-md-6 col-lg-5 mb-5 mb-md-0">
                    <h1>Stay save on german routes</h1>
                    <p>CrimeView analyses your car-travel route and generates an overview of all german-counties (Landkreise) on the route, inluding their current crime rates. </p>
                    <p>CrimeView displays a map of your route below and mark the counties you should avoid if possible.</p>
                    <p>We retrieve our data from a variety of open data sources.</p>
                </div>
                <div class="col-md-8 col-lg-5">
                    <img class="main-img" src="assets/images/bka_logo.png" alt="The BKA logo">
                    <img class="main-img" src="assets/images/osm_logo.png" alt="The OSM Logo">
                    <img class="main-img" src="assets/images/leaflet_logo.png" alt="The leaflet logo">
                    <img class="main-img" src="assets/images/opendatasoft_logo.png" alt="the Opendatasoft logo">
                </div>
            </div>
            <hr>
            <div class="row justify-content-between align-items-stretch" style="margin-bottom: 40px;">
                <div class="col-md-6 col-lg-5 mb-md-0">
                    <h2>Get started here</h2>
                    <p>Submit your travel route below to get started.</p>
                    <form id="formRoute" class="form-search " method="POST ">
                        <input id="inputDeparture" required type="text " name="from" placeholder="Departure">
                        <img src="assets/images/exchange-arrows.svg" title="Exchange Cities" onclick="exchangeInputs()">
                        <input id="inputDestination" required type="text " name="to" placeholder="Destination">
                        <button type="submit" style="display: block;" class="button button-hero mt-4" href="#">Stay save</button>
                    </form>
                    <div class="map-content card-container">

                    </div>
                </div>
                <div class="map-content map-container col-md-8 col-lg-7">
                    <div id="osm_map"></div>
                </div>
            </div>
        </div>
    </section>

    <script type="text/javascript">
        var map = null;

        class County {
            constructor(geoJson, crimeRate, color) {
                this.geoJson = geoJson;
                this.crimeRate = crimeRate;
                this.color = color;
            }
        }

        $("#formRoute").submit(function(e) {
            e.preventDefault()

            var data = new FormData($("#formRoute")[0]);
            fetch('/?c=Home&a=getCounties', {
                method: 'POST',
                body: data,
            }).then(data => {
                data.json().then(json => {
                    initMap();
                    addRouting(json.from.city.lat, json.from.city.lon, json.to.city.lat, json.to.city.lon);
                    $(".card").remove();

                    $(".map-container").append(
                        '<div class="card">' +
                        '<div class="card-body ">' +
                        '<h5 class="card-title ">   Route information</h5>' +
                        '<p class="card-text "> On your way from ' + $("#inputDeparture").val() + ' to ' + $("#inputDestination").val() + ' you will pass ' +
                        json.counties.length + ' german counties.</p>' +
                        '<p class="card-text "><small class="text-muted ">Geocoding provided by Nominatim: <a href=https://nominatim.openstreetmap.org>See data source</a></small></p>' +
                        '<p class="card-text "><small class="text-muted ">Crime statistics provided by BKA: <a href=https://www.bka.de/DE/Home/home_node.html>See data source</a></small></p>' +
                        '<p class="card-text "><small class="text-muted ">County information provided by OpenDataSoft: <a href=https://www.opendatasoft.com/de>See data source</a></small></p>' +
                        '<p class="card-text "><small class="text-muted ">Map provided by OpenStreetMap and displayed with Leaflet: <a href=https://leafletjs.com>See data source</a></small></p>' +
                        '</div>' +
                        '</div>'
                    );

                    var countyAdded = 0;

                    json.counties.forEach(element => {
                        L.geoJson($.parseJSON(element.county.geoJson), {
                            style: polystyle(getColorByCrimeRate(element.county.crimeStats.rate))
                        }).addTo(map);
                        var dist_string = "<strong>Crime distribution: </strong>";
                        element.county.crimeStats.distribution.forEach(dist => {
                            dist_string += Object.keys(dist)[0] + ": " + Object.values(dist)[0] + ", ";
                        });

                        dist_string = dist_string.replace(/,\s$/g, '');

                        if (countyAdded < 3) {
                            $(".card-container").append(
                                '<div class="card">' +
                                '<div class="card-body ">' +
                                '<h5 class="card-title " style=" color: ' + getColorByCrimeRate(element.county.crimeStats.rate) + '; ">' + element.county.name + ' (' +
                                element.county.type + ') - ' + element.county.crimeStats.rate + '</h5>' +
                                '<p class="card-text ">' + dist_string + '</p>' +
                                '<p class="card-text "><small class="text-muted ">' + getSuggestionByCrimeRate(element.county.crimeStats.rate) + '</small></p>' +
                                '</div>' +
                                '</div>'
                            );

                            countyAdded++;
                        }
                    });
                })
            });

            $(".map-content").css("visibility", "visible");
        });

        function addRouting(from_lat, from_lng, to_lat, to_lng) {
            new L.Routing.control({
                waypoints: [
                    L.latLng(from_lat, from_lng),
                    L.latLng(to_lat, to_lng)
                ],
                draggableWaypoints: false,
                addWaypoints: false,
                show: false,
                lineOptions: {
                    styles: [{
                        color: 'black',
                        opacity: 0.15,
                        weight: 9
                    }, {
                        color: 'white',
                        opacity: 0.8,
                        weight: 6
                    }, {
                        color: '#2c3e50',
                        opacity: 1,
                        weight: 2
                    }]
                },
            }).addTo(map)
        }

        function initMap() {
            if (map != null) {
                map.off();
                map.remove();
            }

            map = new L.map('osm_map', {
                zoomControl: false
            });

            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'OpenStreetMap',
                maxZoom: 13
            }).addTo(map);
        }

        function polystyle(color) {
            return {
                fillColor: color,
                weight: 2,
                opacity: 1,
                color: '#ffff',
                fillOpacity: 0.5
            };
        }

        function getColorByCrimeRate(crimeRate) {
            var x = crimeRate;
            switch (true) {
                case (crimeRate <= 0.02):
                    return "#27ae60";
                case (crimeRate <= 0.05):
                    return "#d35400";
                case (crimeRate <= 0.06):
                    return "#c0392b";
                default:
                    return "#27ae60";
            }
        }

        function getSuggestionByCrimeRate(crimeRate) {
            var x = crimeRate;
            switch (true) {
                case (crimeRate <= 0.02):
                    return "A pepperspray should be enough.";
                case (crimeRate <= 0.05):
                    return "Maybe bring a knife";
                case (crimeRate <= 0.06):
                    return "We reccommend heavy artiellery";
                default:
                    return "We reccommend heavy artiellery";
            }
        }

        function exchangeInputs() {
            var hold = $("#inputDeparture").val();
            $("#inputDeparture").val($("#inputDestination").val());
            $("#inputDestination").val(hold);
        }
    </script>
</body>

</html>