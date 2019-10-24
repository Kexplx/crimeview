<?php
// Run tests like this from root dir: .\vendor\bin\phpunit .\tests\Controllers\
use PHPUnit\Framework\TestCase;

class MyControllerTest extends TestCase
{ 
    public function testSaySomething(){
        $myController = new MyController();
        $expected = "Hello World";

        $this->assertSame($expected, $myController->saySomething());
    }
}