<?php

/**
 * First sentence is a short description. Then you can write more, just as you like.
 *
 * Here may follow some detailed description about what the class is for.
 *
 * Paragraphs are separated by an empty line.
 */
interface IDataProvider
{
    /**
     * A description for this method.
     * 
     * @param string $var Description.
     *
     * @return string Description.
     */
    public function getCountyCrimeRate(string $countyName): float;

    /**
     * A description for this method.
     * 
     * @param string $var Description.
     *
     * @return string Description.
     */
    public function getCountiesOnRoute(float $from, float $to): array;
}
