<?php

/**
 * First sentence is a short description. Then you can write more, just as you like.
 *
 * Here may follow some detailed description about what the class is for.
 *
 * Paragraphs are separated by an empty line.
 */
class ODSDataProvider implements IDataProvider
{
    public function getCountyCrimeRate(string $countyName): float
    {
        return 0.0;
    }

    public function getCountiesOnRoute(float $from, float $to): array
    {
        return [];
    }
}
