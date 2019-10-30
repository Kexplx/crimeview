class County {
    constructor(geoJson, crimeRate, color) {
        this.geoJson = geoJson;
        this.crimeRate = crimeRate;
        this.color = color;
    }
}

function addCounties(counties){
    counties.forEach(county => {
        function polystyle_green(feature) {
            return {
                fillColor: county.color,
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.5
            };
        }
        
        L.geoJson(count.geoJson, {
            style: polystyle_green
        }).addTo(map);
    });
}