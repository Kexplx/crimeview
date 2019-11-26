<?php

class RouteDataController
{
    private $crimeViewDataProvider;

    public function __construct(CrimeViewDataProvider $crimeViewDataProvider)
    {
        $this->crimeViewDataProvider = $crimeViewDataProvider;
    }

    public function getRouteData()
    {
        echo json_encode(
            $this->crimeViewDataProvider->getRouteData($_GET["from"], $_GET["to"], 3)
        );
    }
}
