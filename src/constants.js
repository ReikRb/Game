
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
    PLAYER: 0
}


//Sprite State Identifier (Direction)
const State = {
    UP:    0,
    LEFT:  1,
    DOWN:  2,
    RIGHT: 3
}
export {Game, FPS, SpriteId, State}