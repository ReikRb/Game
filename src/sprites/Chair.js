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
    
    updateAnimationFrame() {
    
        //Increase time between frames
    if (this.previousState != this.state){
    this.frames.frameCounter = 0
    this.frames.frameChangeCounter = 0
    this.physics.shootingIntervalCounter = 0
    }
    this.frames.frameChangeCounter++;
        //changes frame once the counter equals the speed
    if (this.frames.frameChangeCounter === this.frames.speed) {
            //Changes frame then resets counter
    this.frames.frameCounter = (this.frames.frameCounter +1) % this.frames.framesPerState
    this.frames.frameChangeCounter = 0;
    }
        
            // //Once the max frames are reached it resets (Animation loop)
            // if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
            //     if (sprite.id === SpriteId.ATTACK_VFX) {
            //         let index = globals.sprites.indexOf(sprite)
            //         globals.sprites.splice(index,1)
            //     }
            // }
    }
}

