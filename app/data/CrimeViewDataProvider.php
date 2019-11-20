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
        $result = array();
        $result['from'] = $this->cityDataProvider->getCityByName($from);
        $result['to'] = $this->cityDataProvider->getCityByName($to);
        $countiesOnRoute = $this->countyDataProvider->getCountiesOnRoute($result['from'],  $result['to']);

        $result['counties'] = $this->crimeDataProvider->fillCountiesWithCrimeStats($countiesOnRoute, $countDistribution);
        return $result;
    }
}
