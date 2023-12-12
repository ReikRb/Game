import globals from "./globals.js"
import {Game, State, SpriteId, GRAVITY} from "./constants.js"
import { initMainMenuMap, initMainMenuSprites, initSprites, initLevel, initParchmentBackground, initPlayerAttackVFX,initPlayerFireball } from "./initialize.js";

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

function readKeyboardAndAssignState(sprite) {
    sprite.state =  globals.action.moveLeft               ? State.RUN_LEFT    :    //Left key
                    globals.action.moveRight              ? State.RUN_RIGHT   :    //Right key
                    globals.action.jump && sprite.state === State.RUN_RIGHT                   ? State.JUMP_RIGHT  :
                    sprite.yPos ===274 &&sprite.state ===State. JUMP_RIGHT ? State.IDLE_RIGHT:
                    sprite.state === State.RUN_LEFT       ? State.IDLE_LEFT   :    //No key state left
                    sprite.state === State.RUN_RIGHT      ? State.IDLE_RIGHT  :    //No key state right
                    sprite.state;


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
    //Keyboard event reader
    readKeyboardAndAssignState(sprite);

    console.log("Right: " + globals.action.moveRight )
    console.log("Jump: " + globals.action.jump)
    console.log(sprite.state)
    console.log (sprite.yPos)
    const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;

    //Updates Player's variables State
    switch (sprite.state) {
        case State.RUN_RIGHT:
            sprite.frames.framesPerState = 8
            //If character moves right X is positive
            sprite.physics.ax = sprite.physics.aLimit;
            break;

        case State.RUN_LEFT:
            sprite.frames.framesPerState = 8
            //If character moves left X is negative
            sprite.physics.ax = -sprite.physics.aLimit;
        break;

        case State.IDLE_LEFT:
        case State.IDLE_RIGHT:
            sprite.frames.framesPerState = 6
            sprite.physics.ax = 0
            break

        case State.ATTACK_RIGHT:
        case State.ATTACK_LEFT:
            initPlayerAttackVFX();
            initPlayerFireball();
            break;
        
        case State.JUMP_RIGHT:
        case State.JUMP_LEFT:
            sprite.frames.framesPerState = 2
            sprite.frames.frameCounter = 0
            break;

    }

    //XY Speed Calculation
    sprite.physics.vx += sprite.physics.ax * globals.deltaTime;

    if ((sprite.state === State.RUN_LEFT && sprite.physics.vx  > 0) ||
        (sprite.state === State.RUN_RIGHT && sprite.physics.vx < 0) ||
        (!isLeftOrRightPressed)) {
        sprite.physics.vx *= sprite.physics.friction;
    }

    if (sprite.physics.vx > sprite.physics.vLimit) {
        sprite.physics.vx = sprite.physics.vLimit
    } else if (sprite.physics.vx < -sprite.physics.vLimit) {
        sprite.physics.vx =- sprite.physics.vLimit;
    }

    //Calculates movement in X
    sprite.xPos += sprite.physics.vx * globals.deltaTime

    const isCollision = calculateCollisionWithBorders(sprite)
    if (isCollision) {
        sprite.xPos -= sprite.physics.vx * globals.deltaTime
    }

    
    sprite.physics.ay = GRAVITY;
    
    if (!sprite.physics.isOnGround) {
        sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
    } else {
        if (globals.action.jump) {
            sprite.physics.isOnGround = false;
            sprite.physics.vy += sprite.physics.jumpForce;
        }
    }
    
    sprite.yPos += sprite.physics.vy * globals.deltaTime;
    
    if (sprite.yPos > globals.canvas.height - sprite.imageSet.ySize) {
        sprite.physics.isOnGround = true;
        sprite.yPos = globals.canvas.height - sprite.imageSet.ySize;
        sprite.physics.vy = 0;
    }
    updateAnimationFrame(sprite)
}

function updatePlayerAttackVFX(sprite) {
        updateAnimationFrame(sprite)

    sprite.state = State.RIGHT
    // if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
    //     let index = globals.sprites.indexOf(sprite)
    //     globals.sprites.splice(index,1)
    // }
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
    sprite.yPos = 179;

        //Calculates movement in X
        sprite.xPos += sprite.physics.vx * globals.deltaTime

        updateAnimationFrame(sprite)
            //Edges collision calculation

    const isCollision = calculateCollisionWithBorders(sprite)
    if (isCollision) {
        let index = globals.sprites.indexOf(sprite)
        globals.sprites.splice(index,1)
    }

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

    sprite.frames.framesPerState = 8
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
                    if (sprite.id === SpriteId.ATTACK_VFX) {
                        let index = globals.sprites.indexOf(sprite)
                        globals.sprites.splice(index,1)
                    }
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