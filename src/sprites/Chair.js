import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { State } from "../constants.js"
import { initBubbleParticle } from "../initialize.js";
export class Chair extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames) {
        super(id, state, xPos, yPos, imageSet, frames)

        this.particleCounter = 0

    }

    update() {
        //Updates Chair's variables State
        let player = globals.sprites[0]

        if (player.state === State.ATTACK_RIGHT ||
            player.state === State.RUN_RIGHT ||
            player.state === State.DAMAGED_RIGHT ||
            player.state == State.JUMP_RIGHT ||
            player.state == State.FALL_RIGHT ||
            player.state == State.IDLE_RIGHT
        ) {
            this.xPos = player.xPos - 67;
        } else {
            this.xPos = player.xPos + 50
        }
        this.yPos = player.yPos - 20;

        if (this.particleCounter === 0) {
            let xCenter = this.xPos + this.imageSet.xOffset + this.imageSet.xSize / 2 - 5
            let yCenter = this.yPos + this.imageSet.yOffset - this.imageSet.ySize / 2 + 15
            initBubbleParticle(xCenter, yCenter)
            this.particleCounter++
        } else if (this.particleCounter === 30) {
            this.particleCounter = 0
        } else {
            this.particleCounter++
        }
        this.updateAnimationFrame()

    }


}

