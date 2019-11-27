<?php

use PHPUnit\Framework\TestCase;

/**
 * Provides unit testing for app/controllers/RouteDataControllerTest
 */
class RouteDataControllerTest extends TestCase
{
    /**
     * Tests valid json output of the RouteDataControllre::getRouteData
     */
    public function testGetRouteData()
    {
        $controller = new RouteDataController(new CrimeViewDataProvider(
            new SampleDataProvider,
            new SampleDataProvider,
            new SampleDataProvider
        ));

        $_GET["from"] = "regensburg";
        $_GET["to"] = "erlangen";
        ob_start();
        $controller->getRouteData();
        $response = ob_get_clean();

        $this->assertJson($response);
    }
}
