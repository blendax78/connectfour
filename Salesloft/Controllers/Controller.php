<?php

namespace Salesloft\Controllers;

class Controller
{
    public function __construct()
    {
        // Main Controller initialization call. Parses PUTs and POSTs into a $request parameter
        $this->request = file_get_contents('php://input');
    }

}
