<?php

require __DIR__ . '/../../vendor/autoload.php';
$routes = require "routes.php";

$router = new CrimeViewRouter($routes);
$router->direct(Request::url());
