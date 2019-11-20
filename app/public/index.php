<?php

use PharIo\Manifest\InvalidUrlException;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../Logging.php';

$c = ucfirst($_GET['c']);
$a = $_GET['a'];

try {
    validateParams($c, $a);

    $controllerName = $c . 'Controller';

    $controller = new $controllerName(new OriginDataProvider());
    $controller->$a();
} catch (InvalidUrlException $e) {
    $log->error($e);
    $controller = new NotFoundController();
    $controller->serve();
} catch (InvalidArgumentException $e) {
    $log->error($e);
    http_response_code(404);
} catch (Throwable $th) {
    $log->error($th);
}

function validateParams(string $c = null, string $a = null)
{
    if (!isset($c) || !isset($a)) {
        header("Location: ?c=Home&a=serve");
        exit;
    }

    if (!class_exists($c . 'Controller')) {
        $msg = sprintf('Controller %s not found.', "$c");
        throw new InvalidUrlException($msg);
    }

    if (!method_exists($c . 'Controller', $a)) {
        $msg = sprintf('Action %s not defined in Controller %sController.', $a, $c);
        throw new InvalidUrlException($msg);
    }
}
