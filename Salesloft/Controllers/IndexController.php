<?php

namespace Salesloft\Controllers;

class IndexController extends Controller
{
    public function __construct()
    {
        // Basic controller for index view.
        $indexView = new \Salesloft\Views\IndexView();
        $indexView->render();
    }
}