<?php

/**
 * Used to register new routes and handle incoming requests.
 */
class CrimeViewRouter
{
    private $routes;

    public function __construct(array $routes = null)
    {
        foreach ($routes as $url => $controller) {
            $this->register($url, $controller);
        }
    }

    /**
     * Registers a new url and the controller to handle it's requests.
     */
    public function register(string $url, string $controller)
    {
        $this->routes[$url] = $controller;
    }

    /**
     * Directs an url to the responding controller.
     * Creates a new Controller object and calles previously defined actions on it.
     */
    public function direct(string $url)
    {
        if ($url == "") {
            return header("Location: /home");
        }

        if (array_key_exists($url, $this->routes)) {
            try {
                return $this->callAction(
                    ...explode('@', $this->routes[$url])
                );
            } catch (\Throwable $th) {
                return http_response_code(404);
            }
        }

        return $this->callAction("PagesController", "notFound");
    }

    private function callAction(string $controller, string $action)
    {
        if (method_exists($controller, $action)) {
            return (new $controller(
                new CrimeViewDataProvider(
                    new LocalDataProvider(),
                    new OriginDataProvider(),
                    new OriginDataProvider()
                )
            ))->$action();
        }

        throw new InvalidArgumentException("Action {$action} doesn't exist for controller {$controller}.");
    }
}
