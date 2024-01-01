import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class Door extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames,hitBox){
        super (id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
    }
    update(){
        if (this.isCollidingWithPlayer && globals.key) {
            if (this.frames.frameCounter ===3) {
                let index = globals.sprites.indexOf(this)
                globals.sprites.splice(index,1)
                
                globals.key = false
            }else{
                this.updateAnimationFrame()
            }
        }
        
    }
}