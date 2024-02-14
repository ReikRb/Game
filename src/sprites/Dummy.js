import Sprite from "./Sprite.js";


export class Dummy extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames) {
        super(id, state, xPos, yPos, imageSet, frames)
    }
    update() {
        this.xPos = 368;
        this.yPos = 195;

        this.updateAnimationFrame()
    }
}