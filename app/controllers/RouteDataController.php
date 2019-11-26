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
            $this->dataProvider->getRouteData($_POST["from"], $_POST["to"], 3)
        );
    }
}
