import Sprite from "./Sprite.js";


export class Mana extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update(){
            //Updates Key's variables State
    this.xPos = 128;
    this.yPos = 30 ;
    this.imageSet.yOffset = 118
    }
}