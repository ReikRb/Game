import Sprite from "./Sprite.js";
import {initExplosion} from "../initialize.js"
import globals from "../globals.js";

export class Checkpoint extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, hitBox){
        super (id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
        this.used = false
        this.previousState = false
        this.fireworkDone = false
    }
    update(){
        if (!this.fireworkDone) {
            if (this.used && globals.fireworkCounter < 3) {
                globals.particles.length === 0 ? initExplosion(this.xPos , this.yPos)  :
                false
            } else if (this.used && globals.fireworkCounter===3){
                this.fireworkDone = true
                globals.fireworkCounter = 0
            }    
        }   
        
        this.updateAnimationFrame() 
        this.previousState = this.used
    }
}