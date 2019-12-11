<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../app/core/helpers.php';

/**
 * Provides unit testing for app/controllers/HomeController
 */
class PagesControllerTest extends TestCase
{
    /**
     * Tests if the hits value in /hits is incremented on action call
     */
    public function testCounterUpOnPageVisit()
    {
        $controller = new PagesController(
            new CrimeViewDataProvider(
                new SampleDataProvider,
                new SampleDataProvider,
                new SampleDataProvider
            )
        );

        $path = __DIR__ . "/../../app/controllers/hits";
        file_put_contents($path, '0');
        // visit page
        ob_start();
        $controller->home();
        ob_get_clean();
        $hits = file_get_contents($path);

        $this->assertEquals('1', $hits);
    }
}
