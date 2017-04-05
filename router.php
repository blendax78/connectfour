<?php
require_once('site_config.php');

\Toro::serve(array(
  '/piece/:number' => 'Salesloft\Controllers\PiecesController',
  '/player/:number' => 'Salesloft\Controllers\UsersController',
  '/game' => 'Salesloft\Controllers\BoardsController',
  '/game/:number' => 'Salesloft\Controllers\BoardsController',
  '/' => 'Salesloft\Controllers\IndexController',
  '/index' => 'Salesloft\Controllers\IndexController',
  '/new/:string' => 'Salesloft\Controllers\IndexController'
));