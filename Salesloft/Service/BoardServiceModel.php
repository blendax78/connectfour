<?php

namespace Salesloft\Service;

class BoardServiceModel extends ServiceModel
{
    public function __construct()
    {
        // Uses ServiceModel object, and sets relevent fields to Board Object
        parent::__construct();
        $this->model = new \Salesloft\Models\Board();
        $this->repository = $this->entityManager->getRepository('\Salesloft\Models\Board');
    }

    public function findAll()
    {
        return $this->repository->findBy(array('is_over' => 0));
    }

}
