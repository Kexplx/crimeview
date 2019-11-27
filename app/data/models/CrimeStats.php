<?php

class CrimeStats implements JsonSerializable
{
    private $rate;
    private $distribution;

    public function __construct($rate = null, $distribution = null)
    {
        $this->rate = $rate;
        $this->distribution = $distribution;
    }

    public function getRate()
    {
        return $this->rate;
    }

    public function jsonSerialize()
    {
        foreach ($this->distribution as $key => $value) {
            $hold[] = [$key => $value];
        }

        return [
            'rate' => $this->rate,
            'distribution' => $hold
        ];
    }
}
