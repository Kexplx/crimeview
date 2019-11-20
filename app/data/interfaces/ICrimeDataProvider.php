<?php

interface ICrimeDataProvider
{
    /**
     * Fill given counties with the latest crime stats of each county
     * 
     * @param array $counties to fill with crime stats
     * @param int $countDistribution select the ammound of distributions
     *
     */
    public function fillCountiesWithCrimeStats(array &$counties, int $countDistribution);
}
