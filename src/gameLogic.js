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

        case SpriteId.KEY:
            updateKey(sprite)
            break;

        case SpriteId.CHAIR:
            updateChair(sprite)
            break;
    
        case SpriteId.LIFE:
            updateLife(sprite)
            break;

        case SpriteId.MANA:
            updateMana(sprite)
            break;

        case SpriteId.EMPTY_CRYSTAL_LIFE:
            updateEmptyCrystalLife(sprite)
            break;

        case SpriteId.EMPTY_CRYSTAL_MANA:
            updateEmptyCrystalMana(sprite)
            break;

        case SpriteId.EMPTY_POWER:
            updateEmptyPower(sprite)
            break;
    
        case SpriteId.POWER:
            updatePower(sprite)
            break;
    
        case SpriteId.EMPTY_KEY:
            updateEmptyKey(sprite)
            break;
        
        case SpriteId.OBTAINED_KEY:
            updateObtainedKey(sprite)
            break;

        case SpriteId.CHECKPOINT:
            updateCheckPoint(sprite)
            break;

        default:

            break;
    }
}
function updatePlayer(sprite) {
    //Updates Player's variables State

    sprite.xPos  = 0;
    sprite. yPos = 19;

    sprite.frames.frameCounter = 0;

    sprite.state = State.IDLE
}

function updateChair(sprite) {
    //Updates Player's variables State

    sprite.xPos  = -40;
    sprite. yPos = 0;

    sprite.frames.frameCounter = 0;

    sprite.state = State.IDLE
}


function updateSkeleton(sprite){

    //Updates Skeleton's variables State
    sprite.xPos = 270;
    sprite.yPos = 39;

    sprite.frames.frameCounter = 0;

    sprite.state = State.IDLE
}

function updateKey(sprite){

    //Updates Key's variables State
    sprite.xPos = 320;
    sprite.yPos = 39;

    sprite.frames.frameCounter = 0;

}

function updateEmptyCrystalLife(sprite){

    //Updates Key's variables State
    sprite.xPos = 100;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updateLife(sprite){

    //Updates Key's variables State
    sprite.xPos = 100;
    sprite.yPos = 20;

    sprite.frames.frameCounter = 0;

}

function updateEmptyCrystalMana(sprite){

    //Updates Key's variables State
    sprite.xPos = 128;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updateMana(sprite){

    //Updates Key's variables State
    sprite.xPos = 128;
    sprite.yPos = 20 ;
    sprite.imageSet.yOffset = 60
    sprite.frames.frameCounter = 0;

}

function updateEmptyPower(sprite){

    //Updates Key's variables State
    sprite.xPos = 209;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updatePower(sprite){

    //Updates Key's variables State
    sprite.xPos = 209;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updateEmptyKey(sprite){

    //Updates Key's variables State
    sprite.xPos = 159;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updateObtainedKey(sprite){

    //Updates Key's variables State
    sprite.xPos = 159;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updateCheckPoint(sprite){

    //Updates Key's variables State
    sprite.xPos = 159;
    sprite.yPos = 50;

    sprite.frames.frameCounter = 0;

}

