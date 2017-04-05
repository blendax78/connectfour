<?php

namespace Salesloft\Views;

class BoardsView extends View
{
    public function __construct()
    {
        // Set render template to board page.
        // boards.php requires a $view_data json object
        $this->template = 'boards.php';
    }

}
