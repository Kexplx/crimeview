<?php

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('CrimeView');
$log->pushHandler(new StreamHandler('CrimeView.log', Logger::INFO));