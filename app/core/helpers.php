<?php

function view(string $view): string
{
    return require __DIR__ . "/../views/{$view}.view.php";
}
