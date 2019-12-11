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
        view('home');
    }

    public function notFound()
    {
        view('not-found');
    }
}
