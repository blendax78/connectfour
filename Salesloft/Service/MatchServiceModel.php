<?php

namespace Salesloft\Service;

class MatchServiceModel extends ServiceModel
{
    public function __construct()
    {
        // Uses ServiceModel object, and sets relevent fields to Match Object
        parent::__construct();
        $this->model = new \Salesloft\Models\Match();
        $this->matchRepository = $this->entityManager->getRepository('\Salesloft\Models\Match');
    }

    public function findMatches()
    {
      return $this->matchRepository->findAll();
    }

}
