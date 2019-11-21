<?php

/**
 * Represents a MockDataProvider used to return sample data.
 * 
 * A MockDataProvider is used to increase development speed since no external API calls are needed.
 */
class MockDataProvider implements ICountyDataProvider, ICrimeDataProvider, ICityDataProvider
{
    public function fillCountiesWithCrimeStats(array &$counties, int $countDistribution = 3)
    {
        foreach ($counties as $county) {
            $id = $county->getId();
            switch ($id) {
                case '09373':
                    $county->setCrimeStats(CrimeStats::withRate(0.06, ["Diebstahl" => 58, "Mord" => 1]));
                    break;
                case '09362':
                    $county->setCrimeStats(CrimeStats::withRate(0.05, ["Diebstahl" => 200, "Körperverletzung" => 30]));
                    break;
                case '09574':
                    $county->setCrimeStats(CrimeStats::withRate(0.04, ["Diebstahl" => 50, "Körperverletzung" => 48, "Mord" => 2]));
                    break;
                case '09562':
                    $county->setCrimeStats(CrimeStats::withRate(0.03, ["Diebstahl" => 90, "Raub" => 43]));
                    break;
                case '09375':
                    $county->setCrimeStats(CrimeStats::withRate(0.02, ["Diebstahl" => 180]));
                    break;
                default:
                    $county->setCrimeStats(CrimeStats::withRate(0.01, ["Diebstahl" => 143, "Raub" => 83, "Mord" => 40]));
                    break;
            }
        }
    }

    public function getCountiesOnRoute(City $from, City $to): array
    {
        $pathToGeoJson = __DIR__ . "/geojson/landkreise.geojson";
        $geoJson = file_get_contents($pathToGeoJson);
        $raw = json_decode($geoJson, true);
        $features = $raw["features"];

        $counties = array();

        foreach ($features as $feature) {
            $name = $feature["properties"]["name_2"];
            $type = $feature["properties"]["type_2"];
            $stateName = $feature["properties"]["name_1"];
            $id = $feature["properties"]["cca_2"];
            $geo = json_encode($feature);

            $counties[] = new County($id, $name, $type, $stateName, $geo);
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
