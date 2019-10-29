<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../Logging.php';

$c = ucfirst($_GET['c']);
$a = $_GET['a'];

try {
    validateParams($c, $a);
    $controllerName = $c . 'Controller';

    $controller = new $controllerName();
    $controller->$a();
} catch (InvalidArgumentException $e) {
    $log->error($e);
    // Redirect
} catch (Throwable $th) {
    $log->error($th);
}


function validateParams(string $c, string $a)
{
    if (!isset($c) || !isset($a)) {
        redirect('Home', 'serve');
    }

    if (!class_exists($c . 'Controller')) {
        $msg = sprintf('Controller %s not found.', "$c");
        throw new InvalidArgumentException($msg);
    }

    if (!method_exists($c . 'Controller', $a)) {
        $msg = sprintf('Action %s not defined in Controller %sController.', $a, $c);
        throw new InvalidArgumentException($msg);
    }
}
