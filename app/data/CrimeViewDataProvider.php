<?php

class CrimeViewDataProvider
{
    private $crimeDataProvider;
    private $cityDataProvider;
    private $countyDataProvider;

    public function __construct(ICrimeDataProvider $crimeDataProvider, ICityDataProvider $cityDataProvider, ICountyDataProvider $countyDataProvider)
    {
        $this->crimeDataProvider = $crimeDataProvider;
        $this->cityDataProvider = $cityDataProvider;
        $this->countyDataProvider = $countyDataProvider;
    }

    public function getRouteData(string $from, string $to, $countDistribution): array
    {
        $result = [];
        $result['from'] = $this->cityDataProvider->getCityByName($from);
        $result['to'] = $this->cityDataProvider->getCityByName($to);

        $countiesOnRoute = $this->countyDataProvider->getCountiesOnRoute($result['from'],  $result['to']);
        $this->crimeDataProvider->fillCountiesWithCrimeStats($countiesOnRoute, $countDistribution);

        $result['counties'] = $countiesOnRoute;
        $result['averageCrimeRate'] = $this->calcAverageCrimeRate($countiesOnRoute);
        return $result;
    }

    private function calcAverageCrimeRate(array &$counties)
    {
        $totalRate = 0;
        $count = 0;
        foreach ($counties as $county) {
            $currentRate = $county->getCrimeStats()[0]->getRate();
            if ($currentRate > 0) {
                $totalRate += $currentRate;
                $count++;
            }
        }
        return ($totalRate / $count);
    }
}
