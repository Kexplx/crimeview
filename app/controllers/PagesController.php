<?php

class PagesController
{
    public function __construct(CrimeViewDataProvider $crimeViewDataProvider)
    {
        $this->crimeViewDataProvider = $crimeViewDataProvider;
    }

    public function home()
    {
        require __DIR__ . "/../views/home.view.php";
    }

    public function notFound()
    {
        require __DIR__ . "/../views/not-found.view.php";
    }
}
