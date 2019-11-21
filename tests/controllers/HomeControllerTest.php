<?php

use PHPUnit\Framework\TestCase;

/**
 * Provides unit testing for app/controllers/HomeController
 */
class HomeControllerTest extends TestCase
{
    /**
     * Tests the correct output of the template-include from HomeController:serve.
     * @method HomeController:serve()
     */
    public function testServe()
    {
        $expected = file_get_contents(__DIR__ . "/../../app/templates/home.html.php");

        ob_start();
        $c = new HomeController(new CrimeViewDataProvider(new MockDataProvider, new MockDataProvider, new MockDataProvider));
        $c->serve();
        $actual = ob_get_clean();

        $this->assertSame($expected, $actual);
    }

    /**
     * Tests valid json output of the getCounties method in the home controller
     * @method HomeController:testGetCounties()
     */
    public function testGetCounties()
    {
        $c = new HomeController(new CrimeViewDataProvider(new MockDataProvider, new MockDataProvider, new MockDataProvider));

        $_POST["from"] = "regensburg";
        $_POST["to"] = "erlangen";
        ob_start();
        $c->getCounties();
        $response = ob_get_clean();

        $this->assertJson($response);
    }
}
