<?php
/**
 * Represents the home controller, used to handle request to crimeview's main page.
 *
 * The request URL for talking to this controller is in the form ?c=home&a=[METHOD].
 */
final class HomeController extends AbstractController
{
    public function serve()
    {
        include __DIR__ . "/../templates/home.html.php";
    }
}
