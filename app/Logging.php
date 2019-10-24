<?php
/**
 * Include this file then log like
 * $log->warning('My warning');
 * $log->info('My info');
 */
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('CrimeView');
$log->pushHandler(new StreamHandler('CrimeView.log', Logger::INFO));