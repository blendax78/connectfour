<?php

namespace Salesloft\Controllers;

class MatchController extends Controller 
{
    private $matchesView = null;

    public function __construct()
    {
        // Declares service model and view
        parent::__construct();
        $this->matchesView = new \Salesloft\Views\MatchView();
        $this->matches = new \Salesloft\Service\MatchServiceModel();
    }

    public function get($id = null)
    {
        $matches = $this->matches->findMatches();
        $matchArray = array();

        foreach ($matches as $match) {
            $matchArray[] = $match->toArray();
        }

        $this->matchesView->render(json_encode(
            array(
                'matches' => $matchArray
            )
        ));
    }

    public function post()
    {
        // Handles POST requests. (New matches)
        $id = $this->matches->insert(json_decode($this->request));
    }
}
