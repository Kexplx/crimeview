<?php

use PHPUnit\Framework\TestCase;

class DataProviderTest extends TestCase
{

    /**
     * @dataProvider dataProvider
     */
    public function testGetCountyCrimeRate(IDataProvider $provider)
    {
        $countyNames = ["Regensburg" => "city", "Regensburg" => "county", "München" => "city"];

        foreach ($countyNames as $countyName => $type) {
            $crimeStats = $provider->getCountyCrimeStats($countyName, $type, 3);
            $this->assertInstanceOf('CrimeStats', $crimeStats);
        }
    }

    /**
     * @dataProvider dataProvider
     */
    public function testGetCountiesOnRoute(IDataProvider $provider)
    {
        // Route data
        $regensburgCity = new City("Regensburg, Oberpfalz, Bayern, 93047, Deutschland", "city", 49.0195333, 12.0974869);
        $erlangenCity = new City("Erlangen, Mittelfranken, Bayern, 91052, Deutschland", "city", 49.5981187, 11.003645);
        $nuernbergCity = new City("Nürnberg, Mittelfranken, Bayern, Deutschland", "city", 49.453872, 11.077298);

        $routeRegensburgErlangen["from"] = $regensburgCity;
        $routeRegensburgErlangen["to"] = $erlangenCity;

        $routeErlangenNuernberg["from"] = $erlangenCity;
        $routeErlangenNuernberg["to"] = $nuernbergCity;

        $routeNuernbergRegensburg["from"] = $nuernbergCity;
        $routeNuernbergRegensburg["to"] = $regensburgCity;

        $cites = [$routeRegensburgErlangen, $routeErlangenNuernberg, $routeNuernbergRegensburg];

        foreach ($cites as $route) {
            $counties = $provider->getCountiesOnRoute($route["from"], $route["to"]);
            $this->assertIsArray($counties);
            foreach ($counties as $county) {
                $this->assertInstanceOf('County', $county);
            }
        }
    }

    /**
     * @dataProvider dataProvider
     */
    public function testGetCityByName(IDataProvider $provider)
    {
        $cityNames = ["Regensburg", "Erlangen", "München"];

        foreach ($cityNames as $cityName) {
            $this->assertInstanceOf('City', $provider->getCityByName($cityName));
        }
    }

    public function dataProvider()
    {
        return array(
            array(new MockDataProvider, new OriginDataProvider)
        );
    }
}
