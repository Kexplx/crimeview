<?php

/**
 * Represents a OriginDataProvider used to return live data without using the JValue ODS.
 */
class OriginDataProvider implements ICountyDataProvider, ICrimeDataProvider, ICityDataProvider
{
    public function fillCountiesWithCrimeStats(array &$counties,  int $countDistribution = 3)
    {
        $url = "https://www.bka.de/SharedDocs/Downloads/DE/Publikationen/PolizeilicheKriminalstatistik/{year}/BKATabellen/FaelleLaenderKreiseStaedte/BKA-LKS-F-03-T01-Kreise_csv.csv?__blob=publicationFile&v=3";

        $currentYear = date("Y");
        
        while (true) {
            if (!$data = @file_get_contents(str_replace("{year}", $currentYear, $url))) {
                $currentYear--;
            } else {
                break;
            }
        }

        $this->fillCountiesWithCrimeStatsData($currentYear, $data, $counties, $countDistribution);
        for ($i = 0; $i < 2; $i++) {
            $currentYear--;
            $data = file_get_contents(str_replace("{year}", $currentYear, $url));

            $this->fillCountiesWithCrimeStatsData($currentYear, $data, $counties, $countDistribution);
        }
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
        if ($from->getName() == $to->getName()) {
            throw new InvalidArgumentException("City names are equal");
        }

        $fromLat = $from->getLat();
        $fromLon = $from->getLon();
        $toLat = $to->getLat();
        $toLon = $to->getLon();

        $fromLatAdjusted = $fromLat + 0.0000001;
        $pathToGeoJson = "https://public.opendatasoft.com/explore/dataset/landkreise-in-germany/download?format=geojson&geofilter.polygon=(" . $fromLat . "," . $fromLon . "),(" . $toLat . "," . $toLon . "),(" . $fromLatAdjusted . "," . $fromLon . "),(" . $fromLat . "," . $fromLon . ")";

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
        $json = $this->getNominatimJson($name);

        if (sizeof($json) == 0) {
            throw new InvalidArgumentException("City not found: $name");
        }

        $name = $json[0]["display_name"];
        $lat = $json[0]["lat"];
        $lon = $json[0]["lon"];
        $type = $json[0]["type"];
        $countryCode = $json[0]["address"]["country_code"];

        if ($countryCode == 'de') {
            return new City($name, $type, $lat, $lon);
        } else {
            throw new InvalidArgumentException("City not in Germany: $countryCode");
        }
    }

    private function getNominatimJson($cityName)
    {
        $cityName = urlencode($cityName);

        $url = "http://nominatim.openstreetmap.org/search?q={$cityName}&format=json&addressdetails=1&limit=1";
        $opts = [
            'http' =>
            [
                'method' => "GET",
                'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0\r\n"
            ]
        ];
        $context = stream_context_create($opts);

        $body = file_get_contents($url, false, $context);
        return json_decode($body, true);
    }

    private function csvNumberToFloat(string $number): float
    {
        $number = str_replace(',', '', $number);
        return floatval($number);
    }
}
