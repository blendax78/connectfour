<?php

namespace Salesloft\Service;

class BoardServiceModel extends ServiceModel
{
    public function __construct()
    {
        // Uses ServiceModel object, and sets relevent fields to Board Object
        parent::__construct();
        $this->model = new \Salesloft\Models\Board();
        $this->boardRepository = $this->entityManager->getRepository('\Salesloft\Models\Board');
        $this->userRepository = $this->entityManager->getRepository('\Salesloft\Models\User');
    }

    public function findCurrentBoard()
    {
        return array(
            'board' => $this->boardRepository->findBy(array('is_over' => 0)
            'users' => $this->userRepository->findAll();
        );
    }

}
