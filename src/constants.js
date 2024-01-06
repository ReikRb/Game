
//Estados
const Game = {
    INVALID:        -1,
    LOADING:         0,
    LOAD_MAIN_MENU:  1,
    MAIN_MENU:       2,
    HIGHSCORE:       3,
    LOAD_LEVEL:      4,
    PLAYING:         5,
    GAMEOVER:        6,
    CONTROLS:        7,
    HISTORY :        8,
}

//Frames Per Second
const FPS = 30;
const GRAVITY = 900;

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
    PLATFORM:           15,
    //Background
    PARCHMENT:          16,
    MANACRYSTAL: 17,
    POWER: 18,
    JUMPVFX:19,
    SPIKE: 20

}

//Keyboard key codes
const Key = {
    LEFT: 37,
    RIGHT:39,
    JUMP: 32,
    FIRE: 90,
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

    //PLAYER ATTACK VFX & FIREBALL
    RIGHT:           0,
    LEFT:            1,
    
    //PLATFORM States
    PLATFORM_RIGHT: 0,
    PLATFORM_LEFT:  0,

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
    IDLE_3:          0,

}

const Tile = {
    SIZE_64: 0, //Sprites 64x64
    SIZE_32: 1, //Tiles de mapa 32x32
}
const Collision = {
    NO_COLLISION: 0,
    UP: 1,
    DOWN: 2,
    LEFT:3,
    RIGHT:4
}
const Block = {
    EMPTY:                  0,
    TOP_LEFT:               1,
    TOP:                    2,
    TOP_RIGHT:              3,
    MOON:                   4,
    BOTH_SIDES_FINAL_UP:    5,
    TOP_RIGHT_2:            6,
    BOTH_SIDES_UP:          7,
    TOP_LEFT_2:             8,
    STAR_1:                 9,
    BLOCK:                 10,
    LEFT:                   11,
    DARK:                   12,
    RIGHT:                  13,
    SKY:                    14,
    BOTH_SIDES_VERTICAL:    15,
    BOT_RIGHT_2:            16,
    BOTH_SIDES_DOWN:        17,
    BOT_LEFT_2:             18,
    BOTH_SIDES_LEFT:        19,
    BOTH_SIDES_RIGHT:       20,
    BOT_LEFT:               21,
    BOT:                    22,
    BOT_RIGHT:              23,
    CAVE:                   24,
    BOTH_SIDES_FINAL_DOWN:  25,
    BOTH_SIDES_FINAL_LEFT:  26,
    BOTH_SIDES_HORIZONTAL:  27,
    BOTH_SIDES_FINAL_RIGHT: 28,
    SPIKES:                 29,
    GRASS:                  30,
}
const Obstacle = {
    TOP_LEFT:               1,
    TOP:                    2,
    TOP_RIGHT:              3,
    BOTH_SIDES_FINAL_UP:    5,
    TOP_RIGHT_2:            6,
    BOTH_SIDES_UP:          7,
    TOP_LEFT_2:             8,
    LEFT:                   11,
    DARK:                   12,
    RIGHT:                  13,
    BOTH_SIDES_VERTICAL:    15,
    BOT_RIGHT_2:            16,
    BOTH_SIDES_DOWN:        17,
    BOT_LEFT_2:             18,
    BOTH_SIDES_LEFT:        19,
    BOTH_SIDES_RIGHT:       20,
    BOT_LEFT:               21,
    BOT:                    22,
    BOT_RIGHT:              23,
    BOTH_SIDES_FINAL_DOWN:  25,
    BOTH_SIDES_FINAL_LEFT:  26,
    BOTH_SIDES_HORIZONTAL:  27,
    BOTH_SIDES_FINAL_RIGHT: 28,
}
export const Prueba = {
    X: 1
 }
export {Game, FPS, SpriteId, Key, State, Tile, Block ,GRAVITY, Collision, Obstacle}