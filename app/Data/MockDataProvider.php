<?php

/**
 * First sentence is a short description. Then you can write more, just as you like.
 *
 * Here may follow some detailed description about what the class is for.
 *
 * Paragraphs are separated by an empty line.
 */
class MockDataProvider implements IDataProvider
{
    /**
     * A description for this method.
     * 
     * @param string $countyName Description.
     *
     * @return string Description.
     */
    public function getCountyCrimeRate(string $countyName): float
    {
        return 0.0;
    }

    /**
     * A description for this method.
     * 
     * @param float $from Description.
     * 
     * @param float $to Description.
     *
     * @return array Description.
     */
    public function getCountiesOnRoute(float $from, float $to): array
    {
        return [];
    }
}
