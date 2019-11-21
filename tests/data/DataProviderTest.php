<?php

use PHPUnit\Framework\TestCase;

class DataProviderTest extends TestCase
{

    /**
     * @dataProvider dataProvider
     */
    public function testCrimeDataProvider(CrimeViewDataProvider $provider)
    {

        $route1["from"] = 'Regensburg';
        $route1["to"] = 'Erlangen';

        $route2["from"] = 'Erlangen';
        $route2["to"] = 'Nürnberg';

        $route3["from"] = 'Nürnberg';
        $route3["to"] = 'Regensburg';

        $route4["from"] = 'München';
        $route4["to"] = 'Berlin';

        $cites = [$route1, $route2, $route3, $route4];

        foreach ($cites as $route) {
            $data = $provider->getRouteData($route["from"], $route["to"], 3);
            $this->assertIsArray($data);
            $this->assertInstanceOf('City', $data['from']);
            $this->assertInstanceOf('City', $data['to']);
            $this->assertIsArray($data['counties']);
            foreach ($data['counties'] as $county) {
                $this->assertInstanceOf('County', $county);
            }
        }
    }

    public function dataProvider()
    {
        return array(
            array(new CrimeViewDataProvider(new OriginDataProvider, new OriginDataProvider, new OriginDataProvider)), array(new CrimeViewDataProvider(new MockDataProvider, new MockDataProvider, new MockDataProvider))
        );
    }
}
