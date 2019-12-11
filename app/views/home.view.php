<html lang="en">

<head>
    <title>Home / CrimeView</title>
    <?php require __DIR__ . "/shared/head.view.php"; ?>
    <script src="assets/js/places-api.js"></script>
    <script src="assets/js/helpers.js"></script>
    <script src="assets/js/osm.js"></script>
    <script src="assets/js/card-creators.js"></script>
</head>

<body class="bg-shape">
    <?php require __DIR__ . "/shared/navbar.view.php"; ?>
    <section class="hero-banner">
        <div class="container">
            <div class="row align-items-center align-items-xl-center justify-content-between text-center text-md-left">
                <div class="col-md-6 col-lg-5 mb-5">
                    <h1>CrimeView </h1>
                    <h5><span style="color: green"><?php echo $viewData["hits"]; ?></span> people are traveling safely.</h5>
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
            <div class="row justify-content-between align-items-stretch">
                <div class="col-md-6 col-lg-5">
                    <h2>Submit route here</h2>
                    <p>After a valid input, we'll display a map of your route and mark the counties on the way based on their current crime rate (CR).</p>
                    <p>Last years CR of county = <strong> Commited crimes / Population</strong>.</p>
                    <form id="formRoute" class="form-search " method="POST ">
                        <input id="inputFrom" required type="text " name="from" placeholder="Departure city">
                        <input id="inputTo" required type="text " name="to" placeholder="Destination city">
                        <button type="submit" id="buttonSubmit" class="btn btn-dark">Analyze</button>
                    </form>
                    <div id="container-cards"></div>
                </div>
                <div class="container-right col-md-8 col-lg-7">
                    <div id="container-spinner">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-dark" role="status" style="width: 5rem; height: 5rem;">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <p>Loading route data...</p>
                    </div>
                    <div id="osm-map"></div>
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
        initPlacesApi();
        $("#formRoute").submit(function(e) {
            e.preventDefault();
            showSearch();
            fetch('/routeData' + '?from=' + $("#inputFrom").val() + '&to=' + $("#inputTo").val(), {
                method: 'GET',
            }).then(data => {
                if (data.status != 200) {
                    return showFail();
                }
                data.json().then(json => {
                    initMap(json.from.city.lat, json.from.city.lon, json.to.city.lat, json.to.city.lon);
                    appendRouteInformationCard(".container-right", $("#inputFrom").val(), $("#inputTo").val(), json);

                    lastSelectedCardId = "placeholderCard";
                    appendPlaceholderCard("#container-cards")

                    json.counties.forEach(element => {
                        var card_id = makeid(5);
                        addCountyBorders(element, card_id);
                        appendCountyCard("#container-cards", element, card_id);
                    });
                    showSuccess();
                })
            });
        });

        function showSuccess() {
            $("#container-spinner, #container-status-fail").hide();
            document.getElementById("osm-map").scrollIntoView(true);
            $('#buttonSubmit').attr("disabled", false);
            $("#osm-map").show();
            map.invalidateSize();
            map.fitBounds(polyline.getBounds());
        }

        function showFail() {
            $('#buttonSubmit').attr("disabled", false);
            $("#container-spinner #osm-map").hide();
            $("#container-status-fail").show();
            $(".card").remove();
        }

        function showSearch() {
            $("#container-status-fail, #osm-map").hide();
            $('#buttonSubmit').attr("disabled", true);
            $("#container-spinner").show();
            $(".card").remove();
        }
    </script>
</body>

</html>