<?php

/**
 * Represents a SampleDataProvider used to return sample data.
 * 
 * A SampleDataProvider is used to increase development speed since no external API calls are needed.
 */
class SampleDataProvider implements ICountyDataProvider, ICrimeDataProvider, ICityDataProvider
{
    public function fillCountiesWithCrimeStats(array &$counties, int $countDistribution = 3)
    {
        $data18 = file_get_contents(__DIR__ . "/../samples/bka/BKA-18.csv");
        $data17 = file_get_contents(__DIR__ . "/../samples/bka/BKA-17.csv");
        $data16 = file_get_contents(__DIR__ . "/../samples/bka/BKA-16.csv");

        $this->fillCountiesWithCrimeStatsData(2018, $data18, $counties, $countDistribution);
        $this->fillCountiesWithCrimeStatsData(2017, $data17, $counties, $countDistribution);
        $this->fillCountiesWithCrimeStatsData(2016, $data16, $counties, $countDistribution);
    }

    private function fillCountiesWithCrimeStatsData(int $year, string $data, array &$counties, int $countDistribution = 3)
    {
        $rows = explode("\n", $data);
        $dd = [];

        foreach ($rows as $row) {
            $rowAsArray = str_getcsv($row, ";");
            if (count($rowAsArray) != 18) continue;

            $crimeType = utf8_encode($rowAsArray[1]);

            if ($rowAsArray[0] == "------") {
                $dd[$rowAsArray[2]]["Straftaten insgesamt"] = $this->csvNumberToFloat($rowAsArray[6]);
            } else if (strpos($crimeType, "insgesamt") === false) {
                $dd[$rowAsArray[2]][$crimeType] = $this->csvNumberToFloat($rowAsArray[5]);
            }
        }

        foreach ($counties as $county) {
            $id = ltrim($county->getId(), '0');
            if (array_key_exists($id, $dd)) {
                arsort($dd[$id]);
                $crimeDistribution = array_slice($dd[$id], 1, $countDistribution);
                $county->setCrimeStats(new CrimeStats($year, $dd[$id]["Straftaten insgesamt"] / 100000, $crimeDistribution));
            } else {
                $county->setCrimeStats(new CrimeStats(0, 0, ['No crime distribution available' => 0]));
            }
        }
    }

    public function getCountiesOnRoute(City $from, City $to): array
    {
        $fromName = explode(',', $from->getName());
        $fromName = strtolower($fromName[0]);
        if ($fromName == 'erlangen' || $fromName == 'regensburg'
        ) {
            $pathToGeoJson = __DIR__ . "/../samples/geojson/landkreise.geojson";
        } else if (
            $fromName == 'hamburg' || $fromName == 'berlin'
        ) {
            $pathToGeoJson = __DIR__ . "/../samples/geojson/landkreise_2.geojson";
        } else {
            $pathToGeoJson = __DIR__ . "/../samples/geojson/landkreise_3.geojson";
        }

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

    public function getCityByName(string $name): ?City
    {
        $cutName = explode(',', "$name");
        switch (strtolower($cutName[0])) {
            case "berlin":
                return new City("Berlin, 10117, Germany", "city", 52.5170365, 13.3888599);
            case "erlangen":
                return new City("Erlangen, Mittelfranken, Bayern, 91052, Deutschland", "city", 49.5981187, 11.003645);
            case "essen":
                return new City("Essen, Nordrhein-Westfalen, Germany", "city", 51.4582235, 7.0158171);
            case "hamburg":
                return new City("Hamburg, Germany", "city", 53.5437641, 10.0099133);
            case "nuernberg":
                return new City("Nürnberg, Mittelfranken, Bayern, Deutschland", "city", 49.453872, 11.077298);
            case "regensburg":
                return new City("Regensburg, Oberpfalz, Bayern, 93047, Deutschland", "city", 49.0195333, 12.0974869);
            case "stuttgart":
            default:
                return new City("Stuttgart, Baden-Württemberg, 70173, Germany", "city", 48.7784485, 9.1800132);
        }
    }

    private function csvNumberToFloat(string $number): float
    {
        $number = str_replace(',', '', $number);
        return floatval($number);
    }
}
