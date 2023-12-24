import Sprite from "./Sprite.js";
import globals from "../globals.js"
import {State} from "../constants.js"

export class Fireball extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics){
        super (id, state, xPos, yPos, imageSet, frames, physics)
    }
    update() {
        switch (this.state) {
            case State.RIGHT:
                //If character moves right X is positive
                this.physics.vx = this.physics.vLimit;
                break;
    
            case State.LEFT:
                //If character moves left X is negative
                this.physics.vx = -this.physics.vLimit;
            break;
            
            default:
                console.error("Error: State invalid");
        }
    
            //Calculates movement in X
            this.xPos += this.physics.vx * globals.deltaTime
    
            this.updateAnimationFrame()
                //Edges collision calculation
    
        const isCollision = this.calculateCollisionWithBorders()
        if (isCollision) {
            let index = globals.sprites.indexOf(this)
            globals.sprites.splice(index,1)
        }
    
    }
    calculateCollisionWithBorders() {
        let isCollision = false;
    
        //Collision with right edge
        if (this.xPos + this.imageSet.xSize > globals.canvas.width) {
            isCollision = true
    
        //Collision with left edge
        } else if (this.xPos < 0) {
            isCollision = true
        }
    
        return isCollision;
    }
    updateAnimationFrame() {
    
        //Increase time between frames
    if (this.previousState != this.state){
    this.frames.frameCounter = 0
    this.frames.frameChangeCounter = 0
    this.physics.shootingIntervalCounter = 0
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