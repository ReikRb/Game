import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { Sound } from "../constants.js";

export class Power extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, hitBox) {
        super(id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
    }
    update() {
        if (globals.power && this.isCollidingWithPlayer) {
            let index = globals.sprites.indexOf(this)
            globals.sprites.splice(index, 1)
            
            // Assigns xPos and yPos to init again after player used it
            globals.powerX = this.xPos
            globals.powerY = this.yPos
            globals.currentSound = Sound.POWER_UP
        }

    }
}