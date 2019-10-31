<?php

class County implements JsonSerializable
{
    private $name;
    private $type;
    private $state_name;
    private $crimeStats;

    private $geoJson;

    function __construct(string $name, string $type, string $state_name, CrimeStats $crimeStats, string $geoJson)
    {
        $this->name = $name;
        $this->type = $type;
        $this->geoJson = $geoJson;
        $this->state_name = $state_name;
        $this->crimeStats = $crimeStats;
    }

    public function jsonSerialize()
    {
        return [
            'county' => [
                'name' => $this->name,
                'type' => $this->type,
                'state_name' => $this->state_name,
                'geoJson' => $this->geoJson,
                'crimeStats' => $this->crimeStats->jsonSerialize()
            ]
        ];
    }
}

// $c = new County("Neumarkt", "District", "Bayern", new CrimeStats(19.21, ["Mord" => 1919, "Raub" => 812]), '{"geojson" : "Hello World"}');

// $json = json_encode($c->jsonSerialize(), JSON_PRETTY_PRINT);
// echo $json;
// {
//     "county": {
//         "name": "Neumarkt",
//         "type": "District",
//         "state_name": "Bayern",
//         "geoJson": "{\"geojson\" : \"Hello World\"}",
//         "crimeStats": {
//             "rate": 19.21,
//             "distribution": [
//                 {
//                     "Mord": 1919
//                 },
//                 {
//                     "Raub": 812
//                 }
//             ]
//         }
//     }
// }
