<?php

/**
 * Represents an IDataProvider class used to fetch county and city data from a specific source.
 */
interface IDataProvider
{
    /**
     * Get CrimeRate for a countyname.
     * 
     * @param string $countyName.
     *
     * @return float amount of crimes per x inhabitants
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
