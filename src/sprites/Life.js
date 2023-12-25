import Sprite from "./Sprite.js";


export class Life extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update(){
        this.xPos = 95;
        this.yPos = 20;
    
        this.frames.frameCounter = 0;
    }
}