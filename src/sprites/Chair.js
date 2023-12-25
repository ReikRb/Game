import Sprite from "./Sprite.js";
import globals from "../globals.js"
import {State, SpriteId} from "../constants.js"

export class Chair extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)

    }

    update() {
        //Updates Chair's variables State
        let player
        for (let i = 0; i < globals.sprites.length; i++) {
            const element = globals.sprites[i];
            if (element.id === SpriteId.PLAYER) {
                player = element
            }
        }
        if (player.state === State.ATTACK_RIGHT ||
            player.state === State.RUN_RIGHT ||
            player.state === State.DAMAGED_RIGHT ||
            player.state == State.JUMP_RIGHT ||
            player.state == State.FALL_RIGHT ||
            player.state == State.IDLE_RIGHT
            ) {
                this.xPos  = player.xPos -50;
        } else{
                this.xPos = player.xPos + 50
        }
        this. yPos = player.yPos -20;
        
        this.updateAnimationFrame()
    
    }
    
    
}

