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
    
        case SpriteId.POWERHUD:
            updatePowerHUD(sprite)
            break;
    
        case SpriteId.KEYHUD:
            updateKeyHUD(sprite)
            break;

        case SpriteId.CHECKPOINT:
            updateCheckPoint(sprite)
            break;
        case SpriteId.ATTACK_VFX:
            updatePlayerAttackVFX(sprite)
            break;

        case SpriteId.FIREBALL:
            updateFireball(sprite)
            break;

        default:

            break;
    }
}
//HUD Sprites Functions
function updateEmptyCrystalLife(sprite){

    //Updates Key's variables State
    sprite.xPos = 95;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updateLife(sprite){

    //Updates Key's variables State
    sprite.xPos = 95;
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
    sprite.yPos = 30 ;
    sprite.imageSet.yOffset = 118
    sprite.frames.frameCounter = 0;

}

function updatePowerHUD(sprite){

    //Updates Key's variables State
    sprite.xPos = 209;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

function updateKeyHUD(sprite){

    //Updates Key's variables State
    sprite.xPos = 159;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

}

//In-Game Sprites Functions
function updatePlayer(sprite) {
    //Updates Player's variables State

    sprite.xPos  = 0;
    sprite. yPos = 179;

    sprite.frames.frameCounter = 4;

    sprite.state = State.ATTACK_RIGHT
}

function updatePlayerAttackVFX(sprite) {
    sprite.xPos  = 78;
    sprite. yPos = 181;

    sprite.frames.frameCounter = 4;
    sprite.state = State.RIGHT
}

function updateFireball(sprite) {
    sprite.xPos  = 200;
    sprite. yPos = 179;

    sprite.frames.frameCounter = 1;
    sprite.state = State.RIGHT
}

function updateChair(sprite) {
    //Updates Player's variables State

    sprite.xPos  = -50;
    sprite. yPos = 159;

    sprite.frames.frameCounter = 0;

}


function updateSkeleton(sprite){

    //Updates Skeleton's variables State
    sprite.xPos = 270;
    sprite.yPos = 199;

    sprite.frames.frameCounter = 0;

    sprite.state = State.RUN_LEFT_2
}

function updateKey(sprite){

    //Updates Key's variables State
    sprite.xPos = 400;
    sprite.yPos = 169;

    sprite.frames.frameCounter = 0;

}

function updateCheckPoint(sprite){

    //Updates Key's variables State
    sprite.xPos = 167;
    sprite.yPos = 217;

    sprite.frames.frameCounter = 0;

}

