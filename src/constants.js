
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
    KEY:      2,
    CHAIR:    3,
    LIFE:     4,
    MANA:     5,
    EMPTY_CRYSTAL_LIFE: 6,
    EMPTY_CRYSTAL_MANA: 7,
    EMPTY_POWER: 8,
    POWER: 9,
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

    //Collectables States
    IDLE_3:          0
}

const Tile = {
    SIZE_64: 0, //Sprites 64x64
    SIZE_32: 1, //Tiles de mapa 32x32
}

const Block = {
    EMPTY: 0,
    TOP_LEFT:  1,
    TOP:   2,
    TOP_RIGHT: 3,
    MOON: 4,
    BOTH_SIDES_FINAL: 5,
    TOP_RIGHT_2: 6,
    BOTH_SIDES_UP:7,
    TOP_LEFT_2:8,
    LEFT:  9,
    DARK: 10,
    RIGHT: 11,
    SKY: 12,
    BOT_LEFT:17,
    BOT:   18,
    BOT_RIGHT: 19,
    CAVE:20,
}
export {Game, FPS, SpriteId, State, Tile, Block}