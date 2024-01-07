
//Manages Sprite Class
import globals from "../globals.js"

export default class Sprite{

    constructor(id, state, xPos, yPos, imageSet, frames, physics){
        this.id                              = id;         //Which Sprite
        this.state                           = state;      //Which Action
        this.xPos                            = xPos;       //X Position
        this.yPos                            = yPos;       //Y Position
        this.imageSet                        = imageSet;   //Sprite Image Data
        this.frames                          = frames;     //Frame Animation Data
        this.physics                         = physics     //Physics Data
        this.previousState                   = state       //Last state on previous cycle
        this.isCollidingWithPlayer           = false
        this.isCollidingWithObstacleOnTop    = false
        this.isCollidingWithObstacleOnLeft   = false
        this.isCollidingWithObstacleOnBottom = false
        this.isCollidingWithObstacleOnRight  = false
    }
    
    calculateCollisionWithBorders() {
        let isCollision = false;

        //Collision with right edge
        if (this.xPos + this.hitBox.xOffset + this.hitBox.xSize > (globals.level.data[0].length*32)) {
            isCollision = true
    
        //Collision with left edge
        } else if (this.xPos + this.hitBox.xOffset < 0) {
            isCollision = true
        }

        //Collision with top edge
        if (this.yPos + this.hitBox.yOffset + this.hitBox.ySize > (globals.level.data[0][0].length*32)) {
            isCollision = true
    
        //Collision with bot edge
        } else if (this.yPos + this.hitBox.yOffset < 0) {
            isCollision = true
        }
    
        return isCollision;
    }

    updateAnimationFrame() {
    
        //Increase time between frames
    if (this.previousState != this.state){
    this.frames.frameCounter = 0
    this.frames.frameChangeCounter = 0
    }
    this.frames.frameChangeCounter++;
        //changes frame once the counter equals the speed
    if (this.frames.frameChangeCounter === this.frames.speed) {
            //Changes frame then resets counter
    this.frames.frameCounter = (this.frames.frameCounter +1) % this.frames.framesPerState
    this.frames.frameChangeCounter = 0;
    }
        
            // //Once the max frames are reached it resets (Animation loop)
            // if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
            //     if (sprite.id === SpriteId.ATTACK_VFX) {
            //         let index = globals.sprites.indexOf(sprite)
            //         globals.sprites.splice(index,1)
            //     }
            // }
    }
}


