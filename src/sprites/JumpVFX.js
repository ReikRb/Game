import Sprite from "./Sprite.js";
import globals from "../globals.js"


export class JumpVFX extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames) {
        super(id, state, xPos, yPos, imageSet, frames)
    }
    update() {

        let index = globals.sprites.indexOf(this)
        if (this.frames.frameCounter === this.frames.framesPerState - 1) {
            globals.sprites.splice(index, 1)
        }

        this.updateAnimationFrame()
    }
}