import Sprite from "./Sprite.js";


export class EmptyCrystal extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update(){
    //Updates Key's variables State
    this.xPos = 95;
    this.yPos = 2;

    this.frames.frameCounter = 0;
    }
}