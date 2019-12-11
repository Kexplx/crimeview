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
        $path = __DIR__ . '/hits';

        if (file_exists($path)) {
            $hits = intval(file_get_contents($path));
        } else {
            $hits = 1;
            file_put_contents($path, '1');
        }

        file_put_contents($path, ++$hits);
        view('home', ["hits" => $hits]);
    }

    public function notFound()
    {
        view('not-found');
    }
}
