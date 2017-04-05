<?php

namespace Salesloft\Models;

// Doctrine Model for Boards

/**
 * @Entity @Table(name="board")
 */
class Board extends Model
{
    /**
     * @Id @Column(type="integer") @GeneratedValue
     * @var int
     */
    protected $id;

    /**
     * @Column(type="integer")
     * @var int
     */
    protected $is_over;

    /**
     * Bidirectional - One-To-Many
     *
     * @OneToMany(targetEntity="Piece", mappedBy="board")
     */
    protected $pieces;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getIsOver() {
        return $this->is_over;
    }

    public function setIsOver($is_over) {
        $this->is_over = $is_over;
    }

    public function getPieces() {
        return $this->pieces;
    }

    public function setPieces($pieces) {
        $this->pieces = $pieces;
    }

}
