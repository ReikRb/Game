import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class PowerHUD extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames) {
        super(id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update() {

        if (globals.power) {
            this.frames.frameCounter = 1;
        } else {
            this.frames.frameCounter = 0;
        }
    }
}