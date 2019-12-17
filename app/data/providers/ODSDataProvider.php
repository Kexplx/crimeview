<?php

/**
 * A ODSDataProvider is used to get preloaded data sets from ODS.
 */
class ODSDataProvider implements ICrimeDataProvider
{
    public function fillCountiesWithCrimeStats(array &$counties,  int $countDistribution = 3)
    {
        $url = "http://localhost:9000/api/storage/{pipeid}?order=id.desc&limit=1";
        $currentYear = 2018;

        for ($i = 1; $i < 4; $i++) {
            $data = json_decode(file_get_contents(str_replace("{pipeid}", $i, $url)), true);
            $this->fillCountiesWithCrimeStatsData($currentYear, $data, $counties, $countDistribution);
            $currentYear--;
        }
    }

    private function fillCountiesWithCrimeStatsData(int $year, array $data, array &$counties, int $countDistribution = 3)
    {
        $dd = [];

        foreach ($data[0]["data"] as $rowAsArray) {

            if (count($rowAsArray) != 18) continue;

            $crimeType = $rowAsArray[2];

            if ($rowAsArray[1] == "------") {
                $dd[$rowAsArray[3]]["Straftaten insgesamt"] = $this->csvNumberToFloat($rowAsArray[7]);
            } else if (strpos($crimeType, "insgesamt") === false) {
                $dd[$rowAsArray[3]][$crimeType] = $this->csvNumberToFloat($rowAsArray[6]);
            }
        }

        foreach ($counties as $county) {
            $id = ltrim($county->getId(), '0');
            if (array_key_exists($id, $dd)) {
                arsort($dd[$id]);
                $crimeDistribution = array_slice($dd[$id], 1, $countDistribution);
                $county->setCrimeStats(new CrimeStats($year, number_format(($dd[$id]["Straftaten insgesamt"] / 100000), 5), $crimeDistribution));
            } else {
                $county->setCrimeStats(new CrimeStats(0, 0, ['No crime distribution available' => 0]));
            }
        }
    }

    private function csvNumberToFloat(string $number): float
    {
        $number = str_replace(',', '', $number);
        return floatval($number);
    }
}
