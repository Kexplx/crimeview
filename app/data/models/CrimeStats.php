<?php

/**
 * Contains information about a counties crime rate and it's crime-distribution from the last year.
 */
class CrimeStats implements JsonSerializable
{
    private $year;
    private $rate;
    private $distribution;

    public function __construct(int $year = null, float $rate = null, array $distribution = null)
    {
        $this->year = $year;
        $this->rate = $rate;
        $this->distribution = $distribution;
    }

    public function getRate()
    {
        return $this->rate;
    }

    public function getYear()
    {
        return $this->year;
    }

    public function jsonSerialize()
    {
        foreach ($this->distribution as $key => $value) {
            $hold[] = [$key => $value];
        }

        return [
            'year' => $this->year,
            'rate' => $this->rate,
            'distribution' => $hold
        ];
    }
}
