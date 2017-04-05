<?php
require_once('site_config.php');

\Toro::serve(array(
  '/piece/:number' => 'Salesloft\Controllers\PiecesController',
  '/user/:number' => 'Salesloft\Controllers\UsersController',
  '/board' => 'Salesloft\Controllers\BoardsController',
  '/board/:number' => 'Salesloft\Controllers\BoardsController',
  '/' => 'Salesloft\Controllers\IndexController',
  '/index' => 'Salesloft\Controllers\IndexController',
  '/new/:string' => 'Salesloft\Controllers\IndexController'
));