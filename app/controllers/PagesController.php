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
        $path = __DIR__ . '/clicks';
        $clickCount = intval(file_get_contents($path));
        file_put_contents($path, ++$clickCount);

        view('home', ["clickCount" => $clickCount]);
    }

    public function notFound()
    {
        view('not-found');
    }
}
