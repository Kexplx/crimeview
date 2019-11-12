<?php

use PHPUnit\Framework\TestCase;

class DataProviderTest extends TestCase
{

    /**
     * @dataProvider dataProvider
     */
    public function testGetCountyCrimeRate(IDataProvider $provider)
    {
        $counties = array(
            'Nürnberg' => '09564',
            'Erlangen' => '09562',
            'München' => '09174',
            'Regensburg' => '09362',
            'Regensburg' => '09375'
        );

        foreach ($counties as $name => $id) {
            $crimeStats = $provider->getCountyCrimeStats($id, 3);
            $this->assertInstanceOf('CrimeStats', $crimeStats);
        }
    }

    /**
     * @dataProvider dataProvider
     */
    public function testGetCountiesOnRoute(IDataProvider $provider)
    {
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
            array(new MockDataProvider()), array(new OriginDataProvider())
        );
    }
}
