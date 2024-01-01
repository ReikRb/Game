import Sprite from "./Sprite.js";


export class Checkpoint extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, hitBox){
        super (id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
        this.used = false
    }
    update(){
        
        this.updateAnimationFrame() 
    }
}