<?php

/**
 * Represents a MockDataProvider used to return sample data.
 * 
 * A MockDataProvider is used to increase development speed since no external API calls are needed.
 */
class MockDataProvider implements IDataProvider
{
    public function getCountyCrimeRate(string $countyName): float
    {
        switch (strtolower($countyName)) {
            case "neumarkt in der oberpfalz":
                return 0.2;
            case "regensburg":
                return 0.15;
            case "nürnberger land":
                return 0.3;
            case "erlangen":
                return 0.1;
            case "erlangen-höchstadt":
                return 0.12;
            default:
                return 0.4;
        }
    }

    public function getCountiesOnRoute(City $from, City $to): array
    {
        $pathToGeoJson = "app/data/geojson/landkreise.geojson";
        $geoJson = file_get_contents($pathToGeoJson);
        $raw = json_decode($geoJson, true);
        $features = $raw["features"];

        $counties = array();

        foreach ($features as $feature) {
            $name = $feature["properties"]["name_2"];
            $type = $feature["properties"]["engtype_2"];
            $stateName = $feature["properties"]["name_1"];
            $geo = json_encode($feature);

            $counties[] = new County($name, $type, $stateName, $geo);
        }

        return $counties;
    }

    public function getCityFromName(string $name): City
    {
        switch (strtolower($name)) {
            case "regensburg":
                return new City("Regensburg, Oberpfalz, Bayern, 93047, Deutschland", "city", 49.0195333, 12.0974869);
            case "nuernberg":
                return new City("Nürnberg, Mittelfranken, Bayern, Deutschland", "city", 49.453872, 11.077298);
            case "erlangen":
                return new City("Erlangen, Mittelfranken, Bayern, 91052, Deutschland", "city", 49.5981187, 11.003645);
            default:
                return new City("Hamburg, 20095, Deutschland", "city", 53.550341, 10.000654);
        }
    }
}
