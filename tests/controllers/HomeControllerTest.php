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
        $homeController = new HomeController(new MockDataProvider());
        $homeController->serve();
        $actual = ob_get_clean();

        $this->assertSame($expected, $actual);
    }

    public function testGetCounties()
    {
        require_once __DIR__ . '/../../vendor/autoload.php';
        ini_set("display_errors", "on");
        $c = new HomeController(new MockDataProvider());

        $_GET["from"] = "regensburg";
        $_GET["to"] = "erlangen";
        $c->getCounties();
        ob_start();

        $response = ob_get_clean();

        echo $response;

        json_decode($response);
        if (json_last_error() != JSON_ERROR_NONE) {
            $this->fail('getCounties() didn\'t return valid json');
        }
    }
}
