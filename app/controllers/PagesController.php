<?php

/**
 * Handles requests for static pages.
 * 
 * Every function serves a single view without modifying it.
 */
class PagesController
{
    private $crimeViewDataProvider;

    public function __construct(CrimeViewDataProvider $crimeViewDataProvider)
    {
        $this->crimeViewDataProvider = $crimeViewDataProvider;
    }

    public function home()
    {
        view('home');
    }

    public function notFound()
    {
        view('not-found');
    }

    public function compact()
    {
        try {
            $data = $this->crimeViewDataProvider->getRouteData($_GET["from"], $_GET["to"], 0);
        } catch (\Throwable $th) {
            $data["fail"] = true;
        }
        view('compact', $data);
    }
}
