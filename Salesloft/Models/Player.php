<?php

namespace Salesloft\Models;

// Doctrine Model for Boards

/**
 * @Entity @Table(name="player")
 */
class Player extends Model
{
    /**
     * @Id @Column(type="integer") @GeneratedValue
     * @var int
     */
    protected $id;

    /**
     * @Name @Column(type="string")
     * @var string
     */
    protected $name;

    /**
     * @Turn @Column(type="integer")
     * @var int
     */
    protected $turn;

    /**
     * @IsActive @Column(type="integer")
     * @var int
     */
    protected $is_active;


    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }
}
