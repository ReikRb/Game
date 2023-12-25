import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class Mana extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update(){
        //Updates Key's variables State
        let dif = Math.floor(50 - (globals.mana / 8))
        this.xPos = 128;
        this.yPos = 2 + dif ;
        this.imageSet.yOffset = 88 +dif
    }
}