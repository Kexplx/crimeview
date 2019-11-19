<?php

class CrimeViewDataProvider
{
    private $crimeDataProvider;
    private $geoDataProvider;
    private $cityDataProvider;

    public function __construct(ICrimeDataProvider $crimeDataProvider, IGeoDataProvider $geoDataProvider, ICountyDataProvider $cityDataProvider)
    {
        $this->crimeDataProvider = $crimeDataProvider;
        $this->geoDataProvider = $geoDataProvider;
        $this->cityDataProvider = $cityDataProvider;
    }

    public function getRouteData(string $from, string $to, $countDistribution): array
    {
        $fromCity = $this->cityDataProvider->getCityByName($from);
        $toCity = $this->cityDataProvider->getCityByName($to);
        $countiesOnRoute = $this->geoDataProvider->getCountiesOnRoute($fromCity, $toCity);

        $result = $this->strategyCrime->getCountyCrimeStats($countiesOnRoute, $countDistribution);
        return $result;
    }
}
