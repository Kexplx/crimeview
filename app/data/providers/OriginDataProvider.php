<?php

/**
 * Represents a OriginDataProvider used to return live data without using the JValue ODS.
 * 
 * A OriginDataProvider is used to get live data sets via easy API calls.
 */
class OriginDataProvider implements ICountyDataProvider, ICrimeDataProvider, ICityDataProvider
{
    // public function fillCountiesWithCrimeStats(array &$counties, int $countDistribution = 3)
    // {
    //     $data = file_get_contents("https://www.bka.de/SharedDocs/Downloads/DE/Publikationen/PolizeilicheKriminalstatistik/2018/BKATabellen/FaelleLaenderKreiseStaedte/BKA-LKS-F-03-T01-Kreise_csv.csv?__blob=publicationFile&v=3");
    //     $rows = explode("\n", $data);
    //     $dd = [];

    //     foreach ($rows as $row) {
    //         $rowAsArray = str_getcsv($row, ";");
    //         if (count($rowAsArray) != 18) continue;
    //         $dd[strval($rowAsArray[2])][$rowAsArray[1]] = $this->csvNumberToFoat($rowAsArray[5]);
    //     }

    //     foreach ($counties as $county) {
    //         $id = ltrim($county->getId(), '0');
    //         $county->setCrimeStats(new CrimeStats($dd[$id]["Straftaten insgesamt"] / 100000, array_slice($dd[$id], 1, 4)));
    //     }
    // }

    public function fillCountiesWithCrimeStats(array &$counties, int $countDistribution = 3)
    {
        $data = file_get_contents("https://www.bka.de/SharedDocs/Downloads/DE/Publikationen/PolizeilicheKriminalstatistik/2018/BKATabellen/FaelleLaenderKreiseStaedte/BKA-LKS-F-03-T01-Kreise_csv.csv?__blob=publicationFile&v=3");
        $time_pre = microtime(true);
        $rows = explode("\n", $data);
        $crimes = array();

        foreach ($rows as $row) {
            $rowAsArray = str_getcsv($row, ";");
            if (sizeof($rowAsArray) == 18) {
                foreach ($counties as $county) {
                    $id = $county->getId();
                    if ($rowAsArray[2] == $id) {
                        if ($rowAsArray[0] != "------") {
                            $crime = utf8_encode($rowAsArray[1]);
                            if (strpos($crime, 'insgesamt') === false) {
                                $crimes[$id]["Crimes"][$crime] = $this->csvNumberToFoat($rowAsArray[5]);
                            }
                        } else {
                            $crimes[$id]["Frequency"] = $this->csvNumberToFoat($rowAsArray[6]);
                        }
                    }
                }
            }
        }

        foreach ($counties as $county) {
            $id = $county->getId();
            $currentCrime = $crimes[$id];
            if (sizeof($currentCrime) > 0) {
                arsort($currentCrime["Crimes"]);
                $currentCrime["Crimes"] = array_slice($currentCrime["Crimes"], 0, $countDistribution);
                $county->setCrimeStats(CrimeStats::withRate($currentCrime["Frequency"] / 100000, $currentCrime["Crimes"]));
            }
        }
        $time_post = microtime(true);
        error_log($time_post - $time_pre);
    }

    public function getCountiesOnRoute(City $from, City $to): array
    {
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
        $lowerCityName = urlencode($name);
        $url = "https://nominatim.openstreetmap.org/search?q=" . $lowerCityName . "&format=json&limit=1&countrycodes=de";

        $json = $this->curlGetJson($url);

        $name = $json[0]["display_name"];
        $lat = $json[0]["lat"];
        $lon = $json[0]["lon"];
        $type = $json[0]["type"];

        return new City($name, $type, $lat, $lon);
    }

    private function curlGetJson($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        $output = curl_exec($ch);
        curl_close($ch);

        return json_decode($output, true);
    }

    private function csvNumberToFoat(string $number): float
    {
        $number = str_replace(',', '', $number);
        return floatval($number);
    }
}
