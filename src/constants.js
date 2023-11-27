
//Estados
const Game = {
    INVALID: -1,
    LOADING:  0,
    PLAYING:  1,
    OVER:     2
}

//Frames Per Second
const FPS = 30;

//Sprite type Identifier (ID)
const SpriteId = {
    PLAYER:   0,
    SKELETON: 1,
}


//Sprite State Identifier (Direction)
const State = {
    IDLE:  0,
    RIGHT: 1,
    LEFT:  2,
    JUMP_RIGHT:  3,
    JUMP_LEFT:   4,
    FALL_RIGHT:  5,
    FALL_LEFT:   6,
    ATTACK_RIGHT: 7,
    ATTACK_LEFT: 8,
    DAMAGED_RIGHT: 9,
    DAMAGED_LEFT:  10,
    DEAD_RIGHT:    11,
    DEAD_LEFT:     12,

    // SKELETON States 
    IDLE:            0,
    RIGHT_2:         1,
    LEFT_2:          2,
    ATTACK_RIGHT_2:  3,
    ATTACK_LEFT_2:   4,
    DAMAGED_RIGHT_2: 5,
    DAMAGED_LEFT_2:  6,
    DEAD_RIGHT_2:    7,
    DEAD_LEFT_2:     8,
}
export {Game, FPS, SpriteId, State}