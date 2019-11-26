<?php

class Request
{
    public static function url()
    {
        return trim($_SERVER["REQUEST_URI"], '/');
    }
}
