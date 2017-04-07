<?php

namespace Salesloft\Models;

// Doctrine Model for Matches

/**
 * @Entity @Table(name="matches")
 */
class Match extends Model
{
    /**
     * @Id @Column(type="integer") @GeneratedValue
     * @var int
     */
    protected $id;

    /**
     * @Column(type="string")
     * @var str
     */
    protected $name;

}
