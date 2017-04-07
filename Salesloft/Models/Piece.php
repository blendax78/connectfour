<?php

namespace Salesloft\Models;

// Doctrine Model for Pieces

/**
 * @Entity @Table(name="piece")
 */
class Piece extends Model
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
    protected $x;

    /**
     * @Column(type="integer")
     * @var int
     */
    protected $y;

    /**
     * @Column(type="string")
     * @var string
     */
    protected $color;

    /**
     * @Column(type="integer")
     * @var int
     */
    protected $board_id;

    /**
     * @Column(type="integer")
     * @var int
     */
    protected $is_selected;

    /**
     * @Column(type="integer")
     * @var int
     */
    protected $selected_by;

    /**
     * Bidirectional - Many Pieces belong to a Board
     *
     * @ManyToOne(targetEntity="Board", inversedBy="pieces")
     */
    protected $board;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getX() {
        return $this->x;
    }

    public function setX($x) {
        $this->x = $x;
    }

    public function getY() {
        return $this->y;
    }

    public function setY($y) {
        $this->y = $y;
    }

    public function getColor() {
        return $this->color;
    }

    public function setColor($color) {
        $this->color = $color;
    }

    public function getBoardId() {
        return $this->board_id;
    }

    public function setBoardId($boardId) {
        $this->board_id = $boardId;
    }

}
