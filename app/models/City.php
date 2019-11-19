<?php

class City implements JsonSerializable
{
    private $name;
    private $lat;
    private $lon;
    private $type;

    public function __construct($name, $type, $lat, $lon)
    {
        $this->name = $name;
        $this->lat = $lat;
        $this->lon = $lon;
        $this->type = $type;
    }

    public function jsonSerialize()
    {
        return [
            'city' => [
                'name' => $this->name,
                'lat' => $this->lat,
                'lon' => $this->lon,
                'type' => $this->type
            ]
        ];
    }

    public function getLat()
    {
        return $this->lat;
    }

    public function getLon()
    {
        return $this->lon;
    }
}
