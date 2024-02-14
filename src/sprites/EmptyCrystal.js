import Sprite from "./Sprite.js";


export class EmptyCrystal extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames) {
        super(id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
    update() {

        this.frames.frameCounter = 0;
    }
}