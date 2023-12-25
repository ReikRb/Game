import Sprite from "./Sprite.js";


export class Parchment extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
    }
    update(){
        this.xPos = 0;
        this.yPos = 0;
    }
}