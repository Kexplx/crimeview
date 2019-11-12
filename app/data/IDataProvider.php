<?php

/**
 * Represents a IDataProvider used to fetch county and city data
 */
interface IDataProvider
{
    /**
     * Gets the latest crime stats of a county
     * 
     * @param string $countyName Name of the county
     *
     * @return float The countie's crime stats that hold (amount of crimes / inhabitants) and its distribution
     */
    public function getCountyCrimeStats(string $id, int $countDistribution): CrimeStats;

    /**
     * Gets all counties on a route
     * xs
     * @param City $from The departure city
     * @param City $to The destination city
     *
     * @return array Counties on given route
     */
    public function getCountiesOnRoute(City $from, City $to): array;

    /**
     * Gets city by name
     * 
     * @param string $name The city name to look up
     *
     * @return City The city model
     */
    public function getCityByName(string $name): City;
}
