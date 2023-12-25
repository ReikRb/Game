import Sprite from "./Sprite.js";


export class Power extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update(){
        
    this.xPos = 209;
    this.yPos = 2;

    }
}