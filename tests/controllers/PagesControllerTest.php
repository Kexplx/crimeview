<?php

use PHPUnit\Framework\TestCase;

/**
 * Provides unit testing for app/controllers/HomeController
 */
class PagesControllerTest extends TestCase
{
    /**
     * Tests the correct output of PagesController::home.
     */
    public function testHome()
    {
        $expected = file_get_contents(__DIR__ . "/../../app/views/home.view.php");

        ob_start();
        $controller = new PagesController(
            new CrimeViewDataProvider(
                new SampleDataProvider,
                new SampleDataProvider,
                new SampleDataProvider
            )
        );

        $controller->home();
        $actual = ob_get_clean();

        $this->assertSame($expected, $actual);
    }

    /**
     * Tests the correct output of PagesController::notFound.
     */
    public function testNotFound()
    {
        $expected = file_get_contents(__DIR__ . "/../../app/views/not-found.view.php");

        ob_start();
        $controller = new PagesController(
            new CrimeViewDataProvider(
                new SampleDataProvider,
                new SampleDataProvider,
                new SampleDataProvider
            )
        );

        $controller->notFound();
        $actual = ob_get_clean();

        $this->assertSame($expected, $actual);
    }
}
