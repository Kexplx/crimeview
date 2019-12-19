var map = null,
    polyline = null,
    lastSelectedCardId = "placeholderCard",
    lastSelectedGeoJsonLayer = null;

/**
 * Initializes the Leaflet Map.
 * Draws the route between the given coordinates.
 * 
 * @param {number} from_lat The Latitude of the departure city.
 * @param {number} from_lng The Longitude of the departure city.
 * @param {number} to_lat The Latitude of the destination city.
 * @param {number} to_lng The Longitude of the destination city.
 */
function initializeLeafletMap(from_lat, from_lng, to_lat, to_lng) {
    if (map != null) {
        map.off();
        map.remove();
    }

    map = new L.map('osm-map', {
        zoomControl: false,
    });

    layer = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'OpenStreetMap',
        maxZoom: 13
    }).addTo(map);

    let blackIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.marker([from_lat, from_lng], { icon: blackIcon }).addTo(map);
    L.marker([to_lat, to_lng], { icon: blackIcon }).addTo(map);

    polyline = L.polyline([
        [from_lat, from_lng],
        [to_lat, to_lng]
    ], { color: '#000', weight: 3, dashArray: "10 10", stroke: true, });

    polyline.bringToFront();
    polyline.addTo(map);
}

/**
 * Marks the passed county on the leaflet map.
 * 
 * @param {string} json The json object containg the route information.
 * @param {string} card_id The unique ID of the county card this Layer will be bound to
 */
function addCountyBorders(json, card_id) {
    L.geoJson($.parseJSON(json.county.geoJson), {
            style: {
                fillColor: getColorByCrimeRate(json.county.crimeStats[0].rate),
                weight: 2,
                opacity: 0.4,
                color: '#fff',
                fillOpacity: 0.4
            },
            onEachFeature: function(_, layer) {
                layer.on({
                    click: function(_) {
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
}

/**
 * Shows the county card which was passed.
 * Hides the card that was previously displayed.
 * 
 * @param {string} card_id The ID of the county-card to show.
 */
function changeSelectedCounty(card_id) {
    if (lastSelectedCardId != "") {
        $("#" + lastSelectedCardId).hide();
    }

    $("#" + card_id).show();
    lastSelectedCardId = card_id;
}