<?php

class County implements JsonSerializable
{
    private $id;
    private $name;
    private $type;
    private $state_name;
    private $geoJson;
    private $crimeStats;


    function __construct(string $id, string $name, string $type, string $state_name, string $geoJson)
    {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
        $this->geoJson = $geoJson;
        $this->state_name = $state_name;
        $this->crimeStats = new CrimeStats();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setCrimeStats(CrimeStats $crimeStats)
    {
        $this->crimeStats = $crimeStats;
    }

    public function jsonSerialize()
    {
        return [
            'county' => [
                'id' => $this->id,
                'name' => $this->name,
                'type' => $this->type,
                'state_name' => $this->state_name,
                'geoJson' => $this->geoJson,
                'crimeStats' => $this->crimeStats->jsonSerialize()
            ]
        ];
    }
}
