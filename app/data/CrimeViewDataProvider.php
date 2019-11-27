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
        $this->sortByCrimeRate($countiesOnRoute);

        $result['counties'] = $countiesOnRoute;
        return $result;
    }

    private function sortByCrimeRate(array &$counties)
    {
        usort($counties, function ($a, $b) {
            return $b->getCrimeStats()->getRate() <=> $a->getCrimeStats()->getRate();
        });
    }
}
