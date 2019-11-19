<?php

/**
 * Used to handle requests with invalid parameters.
 */
final class NotFoundController extends AbstractController
{
    public function serve()
    {
        include __DIR__ . "/../templates/notFound.html.php";
    }
}
