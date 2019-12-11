<?php

function view(string $view, array $viewData = null)
{
    return require __DIR__ . "/../views/{$view}.view.php";
}
