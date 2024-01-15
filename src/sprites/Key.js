import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class Key extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, hitBox){
        super (id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
    }
    update(){

        if (globals.key && this.isCollidingWithPlayer) {
            let index = globals.sprites.indexOf(this)
            globals.sprites.splice(index,1)
        }
    
        this.updateAnimationFrame()
    }
}