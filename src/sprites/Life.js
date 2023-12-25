import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class Life extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update(){
        let dif = Math.floor(50 - (globals.life / 8))
        this.xPos = 95;
        this.yPos = 2+dif;
        this.imageSet.yOffset = 88 +dif
    }
}