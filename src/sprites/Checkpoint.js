import Sprite from "./Sprite.js";


export class Checkpoint extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
    }
    update(){
        this.xPos = 167;
        this.yPos = 217;
    
        this.updateAnimationFrame() 
    }
}