<?php

interface ICountyDataProvider
{
    /**
     * Gets all counties on a route
     * 
     * @param City $from The departure city
     * @param City $to The destination city
     *
     * @return array Counties on given route
     */
    public function getCountiesOnRoute(City $from, City $to): array;
}
