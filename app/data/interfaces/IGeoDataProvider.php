<?php

interface IGeoDataProvider
{
    /**
     * Gets city by name
     * 
     * @param string $name The city name to look up
     *
     * @return City The city model
     */
    public function getCityByName(string $name): City;
}
