<?php

/**
 * Represents a MockDataProvider used to return sample data.
 * 
 * A MockDataProvider is used to increase development speed since no external API calls are needed.
 */
class MockDataProvider implements IDataProvider
{
    public function getCountyCrimeStats(string $countyName): CrimeStats
    {
        switch (strtolower($countyName)) {
            case "neumarkt in der oberpfalz":
                return new CrimeStats(0.2, ["Diebstahl" => 58, "Mord" => 1]);
            case "regensburg":
                return new CrimeStats(0.3, ["Diebstahl" => 200, "Körperverletzung" => 30]);
            case "nürnberger land":
                return new CrimeStats(0.13, ["Diebstahl" => 50, "Körperverletzung" => 48, "Mord" => 2]);
            case "erlangen":
                return new CrimeStats(0.25, ["Diebstahl" => 90, "Raub" => 43]);
            case "erlangen-höchstadt":
                return new CrimeStats(0.2, ["Diebstahl" => 180]);
            default:
                return new CrimeStats(0.4, ["Diebstahl" => 143, "Raub" => 83, "Mord" => 40]);
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
            $crimeStats = $this->getCountyCrimeStats($name);

            $counties[] = new County($name, $type, $stateName, $geo, $crimeStats);
        }

        return $counties;
    }

    public function getCityByName(string $name): City
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
