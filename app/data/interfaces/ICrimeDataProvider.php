<?php

interface ICrimeDataProvider
{
    /**
     * Gets the latest crime stats of a county
     * 
     * @param string $id ID of the county
     *
     * @return float The countie's crime stats that hold (amount of crimes / inhabitants) and its distribution
     */
    public function getCountyCrimeStats(array $counties, int $countDistribution): array;
}
