<?php

class CrimeViewDataProvider
{
    private $strategyCrime;
    private $strategyGeo;
    private $strategyCity;

    public function __construct(ICrimeDataProvider $strategyCrime, IGeoDataProvider $strategyGeo, ICountyDataProvider $strategyCity)
    {
        $this->strategyCrime = $strategyCrime;
        $this->strategyGeo = $strategyGeo;
        $this->strategyCity = $strategyCity;
    }

    public function getRouteData(string $from, string $to, $countDistribution): array
    {
        $fromCity = $this->strategyCity->getCityByName($from);
        $toCity = $this->strategyCity->getCityByName($to);
        $countiesOnRoute = $this->strategyGeo->getCountiesOnRoute($fromCity, $toCity);

        $result = $this->strategyCrime->getCountyCrimeStats($countiesOnRoute, $countDistribution);
        return $result;
    }
}
