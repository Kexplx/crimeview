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
        $expected = file_get_contents( __DIR__ . "/../../app/templates/home.html.php");
        
        ob_start();
        $homeController = new HomeController();
        $homeController->serve();
        $actual = ob_get_clean();

        $this->assertSame($expected, $actual);
    }
}
