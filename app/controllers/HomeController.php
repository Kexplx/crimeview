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
        $from = $_POST["from"] ?? "regensburg";
        $to = $_POST["to"] ?? "erlangen";

        $from_city = $this->dataProvider->getCityByName($from);
        $to_city = $this->dataProvider->getCityByName($to);

        $counties = $this->dataProvider->getCountiesOnRoute($from_city, $to_city);

        $json = json_encode(["from" => $from_city, "to" => $to_city, "counties" => $counties]);
        if ($json) {
            echo $json;
        } else {
            throw new Exception("Couldn't encode to json", 1);
        }
    }
}
