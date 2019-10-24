<?php
/**
 * First sentence is a short description. Then you can write more, just as you like.
 *
 * Here may follow some detailed description about what the class is for.
 *
 * Paragraphs are separated by an empty line.
 */
final class MyController
{
    /**
     * A short description, very much recommended.
     *
     * @var string Description of this 
     */
    protected $var;

    /**
     * A description for this method.
     * 
     * @param string $var Description.
     *
     * @return string Description.
     */
    public function saySomething(string $var = null):string
    {
        return "Hello World";
    }
}