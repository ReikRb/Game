import Sprite from "./Sprite.js";


export class Key extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
    }
    update(){
        this.xPos = 400;
        this.yPos = 169;
    
        this.updateAnimationFrame()
    }
}