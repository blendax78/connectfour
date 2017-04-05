<?php

namespace Salesloft\Controllers;

class BoardsController extends Controller 
{
    private $boardsView = null;

    public function __construct()
    {
        // Declares service model and view
        parent::__construct();
        $this->boardsView = new \Salesloft\Views\BoardsView();
        $this->boards = new \Salesloft\Service\BoardServiceModel();
    }

    public function get($id = null)
    {
        $boardObject = $this->boards->findCurrentBoard();
        $boards = $boardObject->toArray();

        $this->boardsView->render(json_encode($boards));
    }

    public function put()
    {
        // Handles PUT requests. (Updates to boards)
        // Also handles DELETEs, because we do not actually delete boards, we just change their setting to 'deleted'
        $this->boards->update(json_decode($this->request));
    }

    public function post()
    {
        // Handles POST requests. (New boards)
        $id = $this->boards->insert(json_decode($this->request));
        $this->boardsView->render(json_encode( array('id' => $id) ));
    }
}
