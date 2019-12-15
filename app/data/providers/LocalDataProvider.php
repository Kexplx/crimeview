<?php

/**
 * A class LocalDataProvider is used to get parsed data sets from local storage.
 */
class LocalDataProvider implements ICrimeDataProvider
{
    public function fillCountiesWithCrimeStats(array &$counties,  int $countDistribution = 3)
    {
        $rawData = file_get_contents(__DIR__ . "/../crime-db/crime-db");
        $rows = explode("BREAK", $rawData);
        $dd = [];

        foreach ($rows as $row) {
            $encodeRow = explode(";", $row);
            $dd[$encodeRow[0]] = $encodeRow;
        }

        foreach ($counties as $county) {
            $id = ltrim($county->getId(), '0');
            if (array_key_exists($id, $dd)) {
                $crimeRow = $dd[$id];
                if (array_key_exists(1, $crimeRow) && array_key_exists(11, $crimeRow) && array_key_exists(21, $crimeRow)) {
                    $stats = $this->parseCrimeDb($crimeRow, 1, $countDistribution);
                    $county->setCrimeStats(new CrimeStats($stats["year"], $stats["rate"], $stats["distribution"]));

                    $stats = $this->parseCrimeDb($crimeRow, 11, $countDistribution);
                    $county->setCrimeStats(new CrimeStats($stats["year"], $stats["rate"], $stats["distribution"]));

                    $stats = $this->parseCrimeDb($crimeRow, 21, $countDistribution);
                    $county->setCrimeStats(new CrimeStats($stats["year"], $stats["rate"], $stats["distribution"]));

                    continue;
                }
            }

            $county->setCrimeStats(new CrimeStats(0, 0, ['No crime distribution available' => 0]));
        }
    }

    private function parseCrimeDb($crimeRow, $start, $countDistribution)
    {
        $stats = [];
        $counter = $start;

        $stats["year"] = $crimeRow[$counter];
        $counter++;

        $stats["rate"] = floatval($crimeRow[$counter]);
        $counter++;

        $stats["distribution"] = array(
            $crimeRow[$counter] => $crimeRow[$counter + 1],
            $crimeRow[$counter + 2] => $crimeRow[$counter + 3],
            $crimeRow[$counter + 4] => $crimeRow[$counter + 5],
            $crimeRow[$counter + 6] => $crimeRow[$counter + 7],
        );

        $stats["distribution"] = array_slice($stats["distribution"], 0, $countDistribution);

        return $stats;
    }
}
