
//Estados
const Game = {
    INVALID: -1,
    LOADING:  0,
    LOAD_MAIN_MENU:1,
    MAIN_MENU:2,
    HIGHSCORE:3,
    LOAD_LEVEL:4,
    PLAYING:  5,
    OVER:     6
}

//Frames Per Second
const FPS = 30;

//Sprite type Identifier (ID)
const SpriteId = {
    PLAYER:              0,
    SKELETON:            1,
    KEY:                 2,
    CHAIR:               3,
    LIFE:                4,
    MANA:                5,
    EMPTY_CRYSTAL_LIFE:  6,
    EMPTY_CRYSTAL_MANA:  7,
    POWERHUD:            8,
    KEYHUD:              9,
    CHECKPOINT:         10,
    ATTACK_VFX:         11,
    FIREBALL:           12,
    DOOR:               13,
    DUMMY:              14,
    //Background
    PARCHMENT:          15

}


//Sprite State Identifier (Direction)
const State = {

    //PLAYER States
    IDLE_RIGHT:      0,
    IDLE_LEFT:       1,
    RUN_RIGHT:       2,
    RUN_LEFT:        3,
    JUMP_RIGHT:      4,
    JUMP_LEFT:       5,
    FALL_RIGHT:      6,
    FALL_LEFT:       7,
    DAMAGED_RIGHT:   8,
    DAMAGED_LEFT:    9,
    DEAD_RIGHT:     10,
    DEAD_LEFT:      11,
    ATTACK_RIGHT:   12,
    ATTACK_LEFT:    13,

    //PLAYER ATTCK VFX & FIREBALL
    RIGHT:           0,
    LEFT:            1,
    
    // SKELETON States 
    RUN_RIGHT_2:     0,
    RUN_LEFT_2:      1,
    DAMAGED_RIGHT_2: 2,
    DAMAGED_LEFT_2:  3,
    DEAD_RIGHT_2:    4,
    DEAD_LEFT_2:     5,
    ATTACK_RIGHT_2:  6,
    ATTACK_LEFT_2:   7,

    //DUMMY states
    IDLE: 0,
    DEAD: 1,

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
    BOTH_SIDES_FINAL_UP: 5,
    TOP_RIGHT_2: 6,
    BOTH_SIDES_UP:7,
    TOP_LEFT_2: 8,
    PLATFORM_LEFT_2:9,
    PLATFORM_LEFT_1:10,
    STAR_1: 11,
    STAR_2: 12,
    SPIKES_BOT:13,
    SPIKES_TOP:14,
    LEFT:  15,
    DARK: 16,
    RIGHT: 17,
    SKY: 18,
    BOTH_SIDES_VERTICAL: 19,
    BOT_RIGHT_2: 20,
    BOTH_SIDES_DOWN:21,
    BOT_LEFT_2: 22,
    PLATFORM_RIGHT_1:23,
    PLATFORM_RIGHT_2:24,
    GRASS_1: 25,
    GRASS_2: 26,
    SPIKES_LEFT: 27,
    SPIKES_RIGHT: 28,
    BOT_LEFT:29,
    BOT:   30,
    BOT_RIGHT: 31,
    CAVE:32,
    BOTH_SIDES_FINAL_DOWN: 33,
    BOTH_SIDES_FINAL_LEFT: 34,
    BOTH_SIDES_HORIZONTAL: 35,
    BOTH_SIDES_FINAL_RIGHT:36,
    MOBILE_PLATFORM_LEFT: 37,
    MOBILE_PLATFORM_MID: 38,
    MOBILE_PLATFORM_RIGHT: 39




}
export {Game, FPS, SpriteId, State, Tile, Block}