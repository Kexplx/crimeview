<?php

class Request
{
    public static function url()
    {
        return preg_replace('/\?.*$/', '', trim($_SERVER["REQUEST_URI"], '/'));
    }
}
