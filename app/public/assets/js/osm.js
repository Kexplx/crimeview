class County {
    constructor(geoJson, crimeRate, color) {
        this.geoJson = geoJson;
        this.crimeRate = crimeRate;
        this.color = color;
    }
}

var map = null;
var polyline;
var lastSelectedCardId = "";
var lastSelectedGeoJsonLayer;

function initMap(from_lat, from_lng, to_lat, to_lng) {
    if (map != null) {
        map.off();
        map.remove();
    }

    map = new L.map('osm-map', {
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

function polystyle(color) {
    return {
        fillColor: color,
        weight: 2,
        opacity: 0.4,
        color: '#fff',
        fillOpacity: 0.4
    };
}

function addCountyBorders(element, card_id) {
    L.geoJson($.parseJSON(element.county.geoJson), {
            style: polystyle(getColorByCrimeRate(element.county.crimeStats[0].rate)),
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
}


function changeSelectedCounty(id) {
    if (lastSelectedCardId != "") {
        $("#" + lastSelectedCardId).hide();
    }

    $("#" + id).show();
    lastSelectedCardId = id;
}