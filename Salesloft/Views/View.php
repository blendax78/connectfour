<?php

namespace Salesloft\Views;

class View
{
    protected $template;

    public function __construct()
    {
        // Basic View Object
        // Tells subclasses how to render templates.
        $this->template = '';
    }

    public function render($view_data = array())
    {
        require(MAIN_DIR . '/Salesloft/Templates/' . $this->template);
    }
}
