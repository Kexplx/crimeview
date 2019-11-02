<?php

/**
 * Interface for getting data from different sources
 */
interface IDataProvider
{
    /**
     * Get CrimeRate for a countyname.
     * 
     * @param string $countyName.
     *
     * @return float between 0 and 1 with probability to die in this county.
     */
    public function getCountyCrimeRate(string $countyName): float;

    /**
     * Get all Counties on a Route.
     * 
     * @param City $from.
     * @param City $to.
     *
     * @return array of Counties on given route.
     */
    public function getCountiesOnRoute(City $from, City $to): array;

    /**
     * Get City Model from Name.
     * 
     * @param string $name Cityname.
     *
     * @return City Citymodel.
     */
    public function getCityFromName(string $name): City;
}
