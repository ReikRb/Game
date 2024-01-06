import Sprite from "./Sprite.js";
import globals from "../globals.js"
import {State, GRAVITY} from "../constants.js"
import { initCrystal } from "../initialize.js";
export class Skeleton extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.hitBox         = hitBox      //Sprite HitBox
        this.life           = 6
    }
    update(){
        
        if (this.life <= 0) {
            let index = globals.sprites.indexOf(this)
            globals.sprites.splice(index,1)
            initCrystal(this.xPos, this.yPos)
        }
        switch (this.state) {
            case State.RUN_RIGHT_2:
                this.frames.framesPerState = 7
                //If character moves right X is positive
                this.physics.vx = this.physics.vLimit;
                break;
    
            case State.RUN_LEFT_2:
                this.frames.framesPerState = 7
                //If character moves left X is negative
                this.physics.vx = -this.physics.vLimit;
            break;
            case State.ATTACK_LEFT_2:
                this.frames.framesPerState = 4
                //If character moves left X is negative
                this.physics.vx = 0;
                if (this.frames.frameCounter === 1) {
                    this.hitBox.xSize = 80
                    this.hitBox.xOffset = 0 
                    
                }
                if (this.frames.frameCounter === 3) {
                    this.state = State.RUN_LEFT_2
                    this.hitBox.xSize = 35
                    this.hitBox.xOffset = 45
                    }

            break;
            case State.ATTACK_RIGHT_2:
                this.frames.framesPerState = 4
                //If character moves left X is negative
                this.physics.vx = 0;
                if (this.frames.frameCounter === 1) {
                    this.hitBox.xSize = 80

                    
                }
                if (this.frames.frameCounter === 3) {
                    this.state = State.RUN_RIGHT_2
                    this.hitBox.xSize = 35

                    }
            break;
            
            default:
                console.error("Error: State invalid");
        }
    
        //Updates Skeleton's variables State
        const player = globals.sprites[0]
        let rangeX = player.xPos - this.xPos
        let rangeY = player.yPos - this.yPos
 

        if (rangeX <= 0 && this.state === State.RUN_LEFT_2) {
            rangeX *= -1
            rangeY *= -1
            if (rangeX <80 && rangeY < 90) {
                this.state = State.ATTACK_LEFT_2
            }
        } else if (rangeX > 0 && this.state === State.RUN_RIGHT_2) {
            if (rangeX <75) {
                this.state = State.ATTACK_RIGHT_2
            }
            
        }
    
        //Calculates movement in X
        this.xPos += this.physics.vx * globals.deltaTime
    
        this.physics.ay = GRAVITY;
        this.physics.vy += this.physics.ay * globals.deltaTime;
        this.yPos += this.physics.vy * globals.deltaTime;

        this.updateAnimationFrame()
        // updateDirectionRandom(this)
    
        // //Edges collision calculation
        // const isCollision = this.calculateCollisionWithBorders()
        // if (isCollision) {
        //     this.swapDirection()
        // }
        this.previousState = this.state
        
    }
    // swapDirection() {
    //     this.state = this.state ===  State.RUN_RIGHT_2 ? State.RUN_LEFT_2 : State.RUN_RIGHT_2
    // }
}