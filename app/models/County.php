<?php

class County implements JsonSerializable
{
    private $name;
    private $type;
    private $state_name;
    private $geoJson;
    private $crimeStats;


    function __construct(string $name, string $type, string $state_name, string $geoJson, CrimeStats $crimeStats)
    {
        $this->name = $name;
        $this->type = $type;
        $this->geoJson = $geoJson;
        $this->state_name = $state_name;
        $this->crimeStats = $crimeStats;
    }

    public function jsonSerialize()
    {
        return [
            'county' => [
                'name' => $this->name,
                'type' => $this->type,
                'state_name' => $this->state_name,
                'geoJson' => $this->geoJson,
                'crimeStats' => $this->crimeStats->jsonSerialize()
            ]
        ];
    }
}
