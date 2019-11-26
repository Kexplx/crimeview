<?php

use PHPUnit\Framework\TestCase;

class DataProviderTest extends TestCase
{
    /**
     * @dataProvider dataProvider
     */
    public function testCrimeDataProvider(CrimeViewDataProvider $provider, array $cites)
    {
        foreach ($cites as $route) {
            $data = $provider->getRouteData($route["from"], $route["to"], 3);

            $this->assertIsArray($data);
            $this->assertInstanceOf('City', $data['from']);
            $this->assertInstanceOf('City', $data['to']);
            $this->assertIsArray($data['counties']);

            $lastCrimeRate = 1.0;
            foreach ($data['counties'] as $county) {
                $this->assertInstanceOf('County', $county);

                $id = $county->getId();
                $this->assertIsString($id);

                $crimeStats = $county->getCrimeStats();
                $this->assertInstanceOf('CrimeStats', $crimeStats);

                $crimeRate = $crimeStats->getRate();
                $this->assertEqualsWithDelta(0.5,  $crimeRate, 0.5);
                $this->assertLessThanOrEqual($lastCrimeRate, $crimeRate);
                $lastCrimeRate = $crimeRate;
            }
        }
    }

    /**
     * @dataProvider errordataProvider
     */
    public function testErrorCrimeDataProvider(CrimeViewDataProvider $provider, array $dataSet)
    {
        $cites = array();

        $i = 0;
        foreach ($dataSet as $from) {
            $cites[$i]["from"] = $from;
            foreach ($dataSet as $to) {
                $cites[$i]["to"] = $to;
            }
            $i++;
        }

        foreach ($cites as $route) {
            $this->expectException(InvalidArgumentException::class);
            $data = $provider->getRouteData($route["from"], $route["to"], 3);
        }
    }

    public function dataProvider()
    {
        $dataSet = array(
            ["from" => 'Regensburg', "to" => 'Erlangen'],
            ["from" => 'Köln', "to" => 'Berlin'],
            ["from" => 'Hamburg', "to" => 'Würzburg'],
            ["from" => 'Dortmund', "to" => 'Nürnberg']
        );

        $originDataProvider = new CrimeViewDataProvider(new OriginDataProvider, new OriginDataProvider, new OriginDataProvider);
        $mockDataProvider = new CrimeViewDataProvider(new MockDataProvider, new MockDataProvider, new MockDataProvider);

        return array(
            array($originDataProvider, $dataSet), array($mockDataProvider, $dataSet)
        );
    }


    public function errorDataProvider()
    {
        $originDataProvider = new CrimeViewDataProvider(new OriginDataProvider, new OriginDataProvider, new OriginDataProvider);
        $errorDataSet = array("abcdefg", "", " ", "New York");

        return array(
            array($originDataProvider, $errorDataSet)
        );
    }
}
