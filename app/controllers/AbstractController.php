<?php
/**
 * Represents an abstract controller containing method definitions for serving pages.
 */
abstract class AbstractController
{
    /**
     * Serves the implementing controller's main page without any additional template input.
     */
    public abstract function serve();
}
