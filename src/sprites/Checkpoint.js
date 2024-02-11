import Sprite from "./Sprite.js";
import {initExplosion} from "../initialize.js"
import globals from "../globals.js";
import { Sound } from "../constants.js";

export class Checkpoint extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, hitBox){
        super (id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
        this.used = false
        this.timer = 0
        this.fireworkDone = false
    }
    update(){
        
        if (!this.fireworkDone) {
            if (this.used && globals.fireworkCounter < 3) {
                
                if (this.timer === 0) {
                    initExplosion(this.xPos , this.yPos)
                    globals.currentSound = Sound.CHECKPOINT
                }

                if (this.timer === 50) {
                    this.timer = 0
                } else{
                    this.timer++

                }
                
            } else if (this.used && globals.fireworkCounter===3){
                this.fireworkDone = true
                globals.fireworkCounter = 0
            }    
        }   
        
        this.updateAnimationFrame() 

    }
}