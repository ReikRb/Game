import Sprite from "./Sprite.js";
import globals from "../globals.js"
import {State} from "../constants.js"
export class Skeleton extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.hitBox         = hitBox      //Sprite HitBox
    }
    update(){
        switch (this.state) {
            case State.RUN_RIGHT_2:
                //If character moves right X is positive
                this.physics.vx = this.physics.vLimit;
                break;
    
            case State.RUN_LEFT_2:
                //If character moves left X is negative
                this.physics.vx = -this.physics.vLimit;
            break;
            
            default:
                console.error("Error: State invalid");
        }
    
        //Updates Skeleton's variables State
        
    
        //Calculates movement in X
        this.xPos += this.physics.vx * globals.deltaTime
    
        this.updateAnimationFrame()
        // updateDirectionRandom(this)
    
        //Edges collision calculation
        const isCollision = this.calculateCollisionWithBorders()
        if (isCollision) {
            this.swapDirection()
        }
        this.previousState = this.state
        
    }
    swapDirection() {
        this.state = this.state ===  State.RUN_RIGHT_2 ? State.RUN_LEFT_2 : State.RUN_RIGHT_2
    }
}