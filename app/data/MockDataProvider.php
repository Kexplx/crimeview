<?php

/**
 * Represents a MockDataProvider used to return sample data.
 * 
 * A MockDataProvider is used to increase development speed since no external API calls are needed.
 */
class MockDataProvider implements IDataProvider
{
    public function getCountyCrimeStats(string $id, int $countDistribution = 3): CrimeStats
    {
        switch ($id) {
            case '09373':
                return new CrimeStats(0.06, ["Diebstahl" => 58, "Mord" => 1]);
            case '09362':
                return new CrimeStats(0.05, ["Diebstahl" => 200, "Körperverletzung" => 30]);
            case '09574':
                return new CrimeStats(0.04, ["Diebstahl" => 50, "Körperverletzung" => 48, "Mord" => 2]);
            case '09562':
                return new CrimeStats(0.03, ["Diebstahl" => 90, "Raub" => 43]);
            case '09375':
                return new CrimeStats(0.02, ["Diebstahl" => 180]);
            default:
                return new CrimeStats(0.01, ["Diebstahl" => 143, "Raub" => 83, "Mord" => 40]);
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
            $type = $feature["properties"]["type_2"];
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
