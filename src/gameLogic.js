import globals from "./globals.js"
import {Game, State, SpriteId} from "./constants.js"

export default function update(){

    //Modifies Game Depending On Game State
    switch(globals.gameState){
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.PLAYING:
            playGame();
            break;
        
        default:
            console.error("Error: Game State invalid")

    }

}

function playGame() {
        
    updateSprites();
}


function updateSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        updateSprite(sprite)
    }
}

function updateSprite(sprite) {
    const type = sprite.id

    switch (type) {

        //Player Case
        case SpriteId.PLAYER:
            updatePlayer(sprite)
            break;

        case SpriteId.SKELETON:
            updateSkeleton(sprite)
            break;

        default:

            break;
    }
}
function updatePlayer(sprite) {
    //Updates Player's variables State

    sprite.xPos  = 0            ;
    sprite. yPos = 19;

    sprite.frames.frameCounter = 0;

    sprite.state = State.IDLE
}


function updateSkeleton(sprite){

    //Updates Skeleton's variables State
    sprite.xPos = 200;
    sprite.yPos = 39;

    sprite.frames.frameCounter = 0;

    sprite.state = State.IDLE
}