<?php

/**
 * Represents the home controller, used to handle request to crimeview's main page.
 *
 * The request URL for talking to this controller is in the form ?c=home&a=[METHOD].
 */
final class HomeController extends AbstractController
{
    private $dataProvider;

    public function __construct(CrimeViewDataProvider $dataProvider)
    {
        $this->dataProvider = $dataProvider;
    }

    public function serve()
    {
        include __DIR__ . "/../templates/home.html.php";
    }

    public function getCounties()
    {
        $from = htmlspecialchars($_POST["from"]);
        $to = htmlspecialchars($_POST["to"]);

        $counties = $this->dataProvider->getRouteData($from, $to, 3);
        $json = json_encode($counties);
        echo $json;
    }
}
