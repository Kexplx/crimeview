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

<body>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <img src="assets/images/icons8-undefined-40.png" alt="">
        <div class="navbar-nav ">
            <a class="nav-link active" href="">Home</a>
            <a class="nav-link " href="">API / Documentation</a>
        </div>
        <div class="navbar-nav ml-auto ">
            <a class="nav-link " href="">Github</a>
        </div>
    </nav>
    <div class="heading">
        <h1>CrimeView</h1>
        <p>Submit your travel route below to get started.</p>
    </div>

    <form id="formRoute" class="form-search " method="POST ">
        <input value="Regensburg" id="inputDeparture" required type="text " name="from" placeholder="Departure">
        <img src="assets/images/icons8-daten-in-beide-richtungen-48.png" title="Change" onclick="exchangeInputs()">
        <input value="Erlangen" id="inputDestination" required type="text " name="to" placeholder="Destination">
        <button type="submit" class="btn btn-outline-dark">View Crime</button>
    </form>

    <div class="main-container">
        <div id="osm_map"></div>
        <div class="container-cards">
            <div class="card item1">
                <div class="card-body">
                    <h5 class="card-title" style="color: #e41111;">Nürnberg - 20%</h5>
                    <p class="card-text">Some quick example text to the card's content.</p>
                    <p class="card-text"><small class="text-muted">We recommend heavy artillery.</small></p>
                </div>
            </div>
            <div class="card item2">
                <div class="card-body">
                    <h5 class="card-title" style="color: #dd7d00;">Erlangen - 12%</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p class="card-text"><small class="text-muted">Maybe bring a knife.</small></p>
                </div>
            </div>
            <div class="card item3">
                <div class="card-body">
                    <h5 class="card-title" style=" color: #a1be00;">Regensburg - 8%</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p class="card-text"><small class="text-muted">A Pepperspray should be enough.</small></p>
                </div>
            </div>
        </div>
    </div>

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
                    addRouting(json.from.city.lat, json.from.city.lon, json.to.city.lat, json.to.city.lon)
                    json.counties.forEach(element => {
                        L.geoJson($.parseJSON(element.county.geoJson), {
                            style: polystyle(getColorByCrimeRate(element.county.crimeStats.rate))
                        }).addTo(map);
                    });
                })
            });

            $(".main-container").css("visibility", "visible");
        });

        function addRouting(from_lat, from_lng, to_lat, to_lng) {
            new L.Routing.control({
                waypoints: [
                    L.latLng(from_lat, from_lng),
                    L.latLng(to_lat, to_lng)
                ],
                draggableWaypoints: false,
                addWaypoints: false,
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
                show: false
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
            console.log(crimeRate);
            var x = crimeRate;
            switch (true) {
                case (crimeRate <= 0.2):
                    return "#27ae60";
                case (crimeRate <= 0.3):
                    return "#d35400";
                case (crimeRate <= 0.4):
                    return "#c0392b";
                default:
                    return "#27ae60";
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