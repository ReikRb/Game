import Sprite from "./Sprite.js";
import globals from "../globals.js"
import {State} from "../constants.js"

export class Fireball extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.hitBox = hitBox
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
    
}