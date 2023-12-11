import globals from "./globals.js"
import {Game, State, SpriteId} from "./constants.js"
import { initMainMenuMap, initMainMenuSprites, initSprites, initLevel, initParchmentBackground } from "./initialize.js";

export default function update(){

    //Modifies Game Depending On Game State
    switch(globals.gameState){
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.LOAD_MAIN_MENU:
            globals.sprites = []
            initMainMenuMap()
            initMainMenuSprites()
            globals.gameState = Game.MAIN_MENU
            break;

        case Game.MAIN_MENU:
            updateSprites()
            break;
        
        case Game.LOAD_LEVEL:
            globals.sprites = []
            initLevel()
            initSprites()
            globals.gameState = Game.PLAYING
            break;

        case Game.PLAYING:
            playGame();
            break;
        
        case Game.HIGHSCORE:
            globals.sprites = []
            initParchmentBackground();
            break;

        case Game.GAMEOVER:
            globals.sprites = []
            break;

        case Game.CONTROLS:
            globals.sprites = []
            initParchmentBackground();
            break;

        case Game.HISTORY:
            globals.sprites = []
            initParchmentBackground();
            break;
            
        default:
            console.error("Error: Game State invalid")

    }

}

function playGame() {
    
    updateSprites();
    updateLevelTime();
}
function updateLevelTime() {
    //Adds the value modifier counter
    globals.levelTime.timeChangeCounter += globals.deltaTime;

    //Once enough time has passed, modifies the timer value
    if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue) {
        globals.levelTime.value--;

        //Then resets the timeChangeCounter
        globals.levelTime.timeChangeCounter = 0;
    }
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

        case SpriteId.DUMMY:
            updateDummy(sprite)
            break;

        case SpriteId.PARCHMENT:
            updateParchment(sprite)
            break;

        case SpriteId.PLATFORM:
            updatePlatform(sprite)
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

    switch (sprite.state) {
        case State.RUN_RIGHT:
            //If character moves right X is positive
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        case State.RUN_LEFT:
            //If character moves left X is negative
            sprite.physics.vx = -sprite.physics.vLimit;
        break;
        
        default:
            console.error("Error: State invalid");
    }

    //Calculates movement in X
    sprite.xPos += sprite.physics.vx * globals.deltaTime

    updateAnimationFrame(sprite)

    sprite. yPos = 179;

    sprite.state = State.ATTACK_RIGHT
}

function updatePlayerAttackVFX(sprite) {
        updateAnimationFrame(sprite)

    sprite. yPos = 181;

    sprite.state = State.RIGHT
}

function updateFireball(sprite) {
    switch (sprite.state) {
        case State.RIGHT:
            //If character moves right X is positive
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        case State.LEFT:
            //If character moves left X is negative
            sprite.physics.vx = -sprite.physics.vLimit;
        break;
        
        default:
            console.error("Error: State invalid");
    }
    sprite. yPos = 179;

        //Calculates movement in X
        sprite.xPos += sprite.physics.vx * globals.deltaTime

        updateAnimationFrame(sprite)

    sprite.state = State.RIGHT
}

function updateChair(sprite) {
    //Updates Player's variables State
    updateAnimationFrame(sprite)

    sprite.xPos  = -50;
    sprite. yPos = 159;



}

function updatePlatform(sprite) {
    //Updates Platform's variables State

    sprite.xPos  = -50;
    sprite. yPos = 159;

}

function updateSkeleton(sprite){

    switch (sprite.state) {
        case State.RUN_RIGHT_2:
            //If character moves right X is positive
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        case State.RUN_LEFT_2:
            //If character moves left X is negative
            sprite.physics.vx = -sprite.physics.vLimit;
        break;
        
        default:
            console.error("Error: State invalid");
    }

    //Updates Skeleton's variables State
    sprite.yPos = 199;

    //Calculates movement in X
    sprite.xPos += sprite.physics.vx * globals.deltaTime

    updateAnimationFrame(sprite)
    // updateDirectionRandom(sprite)

    //Edges collision calculation
    const isCollision = calculateCollisionWithBorders(sprite)
    if (isCollision) {
        swapDirection(sprite)
    }
}

function updateDummy(sprite){

    //Updates Skeleton's variables State
    sprite.xPos = 368;
    sprite.yPos = 195;

    updateAnimationFrame(sprite)

    sprite.state = State.IDLE
}

function updateKey(sprite){

    //Updates Key's variables State
    sprite.xPos = 400;
    sprite.yPos = 169;

    updateAnimationFrame(sprite)

}

function updateCheckPoint(sprite){

    //Updates Key's variables State
    sprite.xPos = 167;
    sprite.yPos = 217;

    updateAnimationFrame(sprite)


}

function updateParchment(sprite){

    //Updates Parchment's variables State
    sprite.xPos = 0;
    sprite.yPos = 0;

}


function updateAnimationFrame(sprite) {
    //Increase time between frames
    sprite.frames.frameChangeCounter++;

    //changes frame once the counter equals the speed
    if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
        //Changes frame then resets counter
        sprite.frames.frameCounter++;
        sprite.frames.frameChangeCounter = 0;
    }

    //Once the max frames are reached it resets (Animation loop)
    if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
        sprite.frames.frameCounter = 0
    }
}

function calculateCollisionWithBorders(sprite) {
    let isCollision = false;

    //Collision with right edge
    if (sprite.xPos + sprite.imageSet.xSize > globals.canvas.width) {
        isCollision = true

    //Collision with left edge
    } else if (sprite.xPos < 0) {
        isCollision = true
    }

    return isCollision;
}

function updateDirectionRandom(sprite){
    //Adds deltaTime to directionChangeCounter
    sprite.directionChangeCounter += globals.deltaTime
    
    if (sprite.directionChangeCounter > sprite.maxTimeToChangeDirection) {
        
        sprite.directionChangeCounter = 0
        
        sprite.maxTimeToChangeDirection = Math.floor(Math.random()*8) + 1
        
        swapDirection(sprite);
    }
}
function swapDirection(sprite) {
    sprite.state = sprite.state ===  State.RUN_RIGHT_2 ? State.RUN_LEFT_2 : State.RUN_RIGHT_2
}