<?php 

class City implements JsonSerializable
{
    private $name;
    private $lat;
    private $lon;
    private $type;

    public function __construct($name, $type, $lat, $lon)
    {
        $this->name = $name;
        $this->lat = $lat;
        $this->lon = $lon;
        $this->type = $type;
    }

    public function jsonSerialize()
    {
        return [
            'city' => [
                'name' => $this->name,
                'lat' => $this->lat,
                'lon' => $this->lon,
                'type' => $this->type
            ]
        ];
    }


    /*
     * Get Coordinates from City Names
     * 
     * Example response from API
     * Request (GET): https://nominatim.openstreetmap.org/search?q=hamburg&format=json&limit=1&countrycodes=de
     * 
     * 
     [{
         "place_id":114035,
         "licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
         "osm_type":"node",
         "osm_id":20833623,
         "boundingbox":["53.390341","53.710341",
         "9.840654","10.160654"],
         "lat":"53.550341",
         "lon":"10.000654",
         "display_name":"Hamburg, 20095, Deutschland",
         "class":"place",
         "type":"city",
         "importance":0.849144260142488,
         "icon":"https://nominatim.openstreetmap.org/images/mapicons/poi_place_city.p.20.png"
        }]
     */

}