<?php

function view(string $view, array $data = null)
{
    return require __DIR__ . "/../views/{$view}.view.php";
}
