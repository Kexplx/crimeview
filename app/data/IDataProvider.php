<?php

/**
 * Represents a IDataProvider used to fetch county and city data
 */
interface IDataProvider
{
    /**
     * Gets the latest crime rate of a county
     * 
     * @param string $countyName Name of the county
     *
     * @return float The countie's crime rate (amount of crimes / inhabitants)
     */
    public function getCountyCrimeRate(string $countyName): float;

    /**
     * Gets all counties on a route
     * 
     * @param City $from The departure city
     * @param City $to The destination city
     *
     * @return array Counties on given route
     */
    public function getCountiesOnRoute(City $from, City $to): array;

    /**
     * Gets City by name
     * 
     * @param string $name The city name to look up
     *
     * @return City The city model
     */
    public function getCityFromName(string $name): City;
}
