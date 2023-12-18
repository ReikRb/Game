import globals from "./globals.js"
import {Game, State, SpriteId, GRAVITY, Collision} from "./constants.js"
import { initMainMenuMap, initMainMenuSprites, initSprites, initLevel, initParchmentBackground, initPlayerAttackVFX, initPlayerFireball } from "./initialize.js";

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

        case SpriteId.MANACRYSTAL:
            updateCrystal(sprite)
            break;

        default:

            break;
    }
}

function readKeyboardAndAssignState(sprite) {
    
    if (!sprite.physics.isOnGround) {
            sprite.state =  sprite.physics.vy > 0           && sprite.physics.vx > 0                 ? State.FALL_RIGHT      :
                            sprite.physics.vy > 0           && sprite.physics.vx < 0                 ? State.FALL_LEFT       :
                            sprite.physics.vy < 0           && sprite.physics.vx > 0                 ? State.JUMP_RIGHT      :
                            sprite.physics.vy < 0           && sprite.physics.vx < 0                 ? State.JUMP_LEFT       :
                            sprite.physics.vy < 0           && State.IDLE_RIGHT                      ? State.JUMP_RIGHT      :
                            sprite.physics.vy < 0           && State.IDLE_LEFT                       ? State.JUMP_LEFT       :
                            sprite.state          
        
    } else {
        if (sprite.physics.isShooting) {
            sprite.state =  globals.action.fire             && sprite.state  === State.IDLE_RIGHT    ? State.ATTACK_RIGHT    : 
                            globals.action.fire             && sprite.state  === State.ATTACK_RIGHT  ? State.ATTACK_RIGHT    :
                            globals.action.fire             && sprite.state  === State.IDLE_LEFT     ? State.ATTACK_LEFT     : 
                            globals.action.fire             && sprite.state  === State.ATTACK_LEFT   ? State.ATTACK_LEFT     :
                            sprite.state        === State.ATTACK_LEFT                                ? State.IDLE_LEFT       :
                            sprite.state;
            
        } else {
            sprite.state =    
                            globals.action.moveRight                                                 ? State.RUN_RIGHT       :    //Right key
                            globals.action.moveLeft                                                  ? State.RUN_LEFT        :    //Left key
                            sprite.physics.vy   === 0       && sprite.state  === State.FALL_RIGHT    ? State.IDLE_RIGHT      :
                            sprite.physics.vy   === 0       && sprite.state  === State.FALL_LEFT     ? State.IDLE_LEFT       :
                            sprite.state        === State.RUN_LEFT                                   ? State.IDLE_LEFT       :    //No key state left
                            sprite.state        === State.RUN_RIGHT                                  ? State.IDLE_RIGHT      :    //No key state right
                            sprite.state % 2    === 0                                                ? State.IDLE_RIGHT      :
                            sprite.state % 2    === 1                                                ? State.IDLE_LEFT       :
                            sprite.state;

        }
       
    }
                    
}

// function checkDirection(sprite) {
//     return sprite.state % 2
// }

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
    const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;
    if (sprite.previousState === State.ATTACK_RIGHT && sprite.frames.frameCounter / (sprite.frames.framesPerState-1) != 1) {
        sprite.state = State.ATTACK_RIGHT
        sprite.physics.isShooting = true
    } else if (sprite.previousState === State.ATTACK_RIGHT && sprite.frames.frameCounter / (sprite.frames.framesPerState-1) === 1){
        sprite.frames.frameCounter = 0
        sprite.frames.frameChangeCounter = 0
        sprite.physics.shootingIntervalCounter = 0
    } else if (sprite.previousState === State.ATTACK_LEFT && sprite.frames.frameCounter / (sprite.frames.framesPerState-1) != 1) {
        sprite.state = State.ATTACK_LEFT
        sprite.physics.isShooting = true
    } else if (sprite.previousState === State.ATTACK_LEFT && sprite.frames.frameCounter / (sprite.frames.framesPerState-1) === 1){
        sprite.frames.frameCounter = 0
        sprite.frames.frameChangeCounter = 0
        sprite.physics.shootingIntervalCounter = 0
    }
    
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
            sprite.frames.framesPerState = 8
            if (sprite.previousState != State.ATTACK_RIGHT) {
                sprite.physics.shootingIntervalCounter = 0
            }
                if (sprite.frames.frameCounter / (sprite.frames.framesPerState-1) != 1 && sprite.physics.shootingIntervalCounter === 0) {
                    initPlayerAttackVFX((sprite.xPos+78), sprite.yPos, State.RIGHT);
                    setTimeout(() => { initPlayerFireball((sprite.xPos + 78), sprite.yPos, State.RIGHT); }, 400);
                }
                if (sprite.physics.shootingIntervalCounter === sprite.physics.shootingInterval) {
                    sprite.physics.shootingIntervalCounter = 0

                } else{
                    sprite.physics.shootingIntervalCounter++
                }
            break;

        case State.ATTACK_LEFT:
            sprite.frames.framesPerState = 8
            if (sprite.previousState != State.ATTACK_LEFT) {
                sprite.physics.shootingIntervalCounter = 0
            }
                if (sprite.frames.frameCounter / (sprite.frames.framesPerState-1) != 1 && sprite.physics.shootingIntervalCounter === 0) {
                    initPlayerAttackVFX((sprite.xPos+-22), sprite.yPos, State.LEFT);
                    setTimeout(() => { initPlayerFireball((sprite.xPos + -22), sprite.yPos, State.LEFT); }, 400);
                }
                if (sprite.physics.shootingIntervalCounter === sprite.physics.shootingInterval) {
                    sprite.physics.shootingIntervalCounter = 0

                } else{
                    sprite.physics.shootingIntervalCounter++
                }
            break;
        
        case State.JUMP_RIGHT:
        case State.JUMP_LEFT:
        case State.FALL_LEFT:
        case State.FALL_RIGHT:
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

    calculateShoot(sprite)
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

    sprite.previousState = sprite.state
}

function updatePlayerAttackVFX(sprite) {
    let player
    for (let i = 0; i < globals.sprites.length; i++) {
        const element = globals.sprites[i];
        if (element.id === SpriteId.PLAYER) {
            player = element
        }
    }
        sprite. yPos = player.yPos 

        let index = globals.sprites.indexOf(sprite)
        if (sprite.frames.frameCounter === sprite.frames.framesPerState-1) {
            // setTimeout(() => { globals.sprites.splice(index,1); }, 10);
            globals.sprites.splice(index,1)
        }

    updateAnimationFrame(sprite)
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
    //Updates Chair's variables State
    let player
    for (let i = 0; i < globals.sprites.length; i++) {
        const element = globals.sprites[i];
        if (element.id === SpriteId.PLAYER) {
            player = element
        }
    }
    if (player.state === State.ATTACK_RIGHT ||
        player.state === State.RUN_RIGHT ||
        player.state === State.DAMAGED_RIGHT ||
        player.state == State.JUMP_RIGHT ||
        player.state == State.FALL_RIGHT ||
        player.state == State.IDLE_RIGHT
        ) {
            sprite.xPos  = player.xPos -50;
    } else{
            sprite.xPos = player.xPos + 50
    }
    sprite. yPos = player.yPos -20;
    
    updateAnimationFrame(sprite)


}

function updatePlatform(sprite) {
    //Updates Platform's variables State
    sprite.physics.angle += sprite.physics.omega * globals.deltaTime

    setPlatformPosition(sprite)

     

}

export function setPlatformPosition(sprite){
// x = xCenter + Acos(angle)
// y = yCenter + Asin(angle)

    const radius = 65;

    sprite.xPos = sprite.physics.xRotCenter + radius * Math.cos(sprite.physics.angle)
    sprite.yPos = sprite.physics.yRotCenter + radius * Math.sin(sprite.physics.angle)

    sprite.xPos -= sprite.imageSet.xSize/2
    sprite.yPos -= sprite.imageSet.ySize/2

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
    sprite.previousState = sprite.state
    
    
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
    if (sprite.previousState != sprite.state){
        sprite.frames.frameCounter = 0
        sprite.frames.frameChangeCounter = 0
        sprite.physics.shootingIntervalCounter = 0
    }
    sprite.frames.frameChangeCounter++;
            //changes frame once the counter equals the speed
    if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
                //Changes frame then resets counter
        sprite.frames.frameCounter = (sprite.frames.frameCounter +1) % sprite.frames.framesPerState
        sprite.frames.frameChangeCounter = 0;
    }
            
                // //Once the max frames are reached it resets (Animation loop)
                // if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
                //     if (sprite.id === SpriteId.ATTACK_VFX) {
                //         let index = globals.sprites.indexOf(sprite)
                //         globals.sprites.splice(index,1)
                //     }
                // }
}
function calculateShoot(sprite) {
    if (globals.action.fire) {
        sprite.physics.isShooting = true
    } else {
        sprite.physics.isShooting = false
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

function updateCrystal(sprite){

    switch (sprite.collisionBorder) {

        case Collision.RIGHT:
        sprite.physics.vx = -sprite.physics.vLimit;
        break;
        case Collision.LEFT:
        sprite.physics.vx = sprite.physics.vLimit;
        break;
        case Collision.UP:
        sprite.physics.vy = sprite.physics.vLimit;
        break;
        case Collision.DOWN:
        sprite.physics.vy = -sprite.physics.vLimit;
        break;
        
        default:
        //Si no hay colisión, mantenemos las velocidades
    }
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;
    
    //Movimiento de rebote. Cambiamos velocidades según haya colisión con las paredes switch (sprite.collisionBorder)
    updateAnimationFrame(sprite);
    calculateCollisionWithFourBorders (sprite);
}

function calculateCollisionWithFourBorders (sprite){
if (sprite.xPos + sprite.imageSet.xSize > globals.canvas.width)
{
    sprite.collisionBorder = Collision.RIGHT;
}else if (sprite.xPos < 0)
{
    sprite.collisionBorder = Collision.LEFT;
}

else if (sprite.yPos < 0)
{
    sprite.collisionBorder = Collision.UP;
}
else if (sprite.yPos + sprite.imageSet.ySize > globals.canvas.height)
{
    sprite.collisionBorder = Collision.DOWN;
}
else
{
sprite.collisionBorder = Collision.NO_COLLISION;
}
}