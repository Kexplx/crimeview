<?php

interface ICrimeDataProvider
{
    /**
     * Fill given counties with the latest crime stats of each county
     * 
     * @param array $counties to fill with crime stats
     * @param int $countDistribution to set how many distributions are shown
     *
     * @return array The counties filled with its specific crime stats
     */
    public function fillCountiesWithCrimeStats(array &$counties, int $countDistribution): array;
}
