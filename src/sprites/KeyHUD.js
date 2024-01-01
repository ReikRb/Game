import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class KeyHUD extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update(){
            //Updates Key's variables State
            if (globals.key) {
                this.frames.frameCounter = 1;
            } else {
                this.frames.frameCounter = 0;
            }


    }
}