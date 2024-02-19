import globals from "../globals.js";
import Sprite from "./Sprite.js";


export class Spike extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, hitBox) {
        super(id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
        this.isCollidingWithPlayer = false

    }
    update() {
        if (this.isCollidingWithPlayer) {
            const player = globals.sprites[0]
            player.xPos = globals.checkPointX
            player.yPos = globals.checkPointY
        }
    }
}