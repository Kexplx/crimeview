<?php

/**
 * Handles requests for static pages.
 * 
 * Every function serves a single view without modifying it.
 */
class PagesController
{
    public function __construct(CrimeViewDataProvider $crimeViewDataProvider)
    { }

    public function home()
    {
        require __DIR__ . "/../views/home.view.php";
    }

    public function notFound()
    {
        require __DIR__ . "/../views/not-found.view.php";
    }
}
