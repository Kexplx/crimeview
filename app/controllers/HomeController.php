<?php

/**
 * Represents the home controller, used to handle request to crimeview's main page.
 *
 * The request URL for talking to this controller is in the form ?c=home&a=[METHOD].
 */
final class HomeController extends AbstractController
{
    private $dataProvider;

    public function __construct(IDataProvider $dataProvider)
    {
        $this->dataProvider = $dataProvider;
    }

    public function serve()
    {
        include __DIR__ . "/../templates/home.html.php";
    }

    public function getCounties()
    {
        $from = $_GET["from"] ?? "regensburg";
        $to = $_GET["to"] ?? "erlangen";

        $from_city = $this->dataProvider->getCityByName($from);
        $to_city = $this->dataProvider->getCityByName($to);

        $counties = $this->dataProvider->getCountiesOnRoute($from_city, $to_city);

        $json_ok = json_encode($counties);
        if ($json_ok) {
            echo $json_ok;
        } else {
            throw new Exception("Couldn't encode counties to json", 1);
        }
    }
}
