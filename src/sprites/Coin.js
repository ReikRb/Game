import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { Sound } from "../constants.js";
export class Coin extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, hitBox) {
        super(id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
    }
    update() {

        if (this.isCollidingWithPlayer) {
            let index = globals.sprites.indexOf(this)
            globals.sprites.splice(index, 1)
            globals.score += 300
            globals.currentSound = Sound.COIN
        }

        this.updateAnimationFrame()
    }
}