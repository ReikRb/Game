import Sprite from "./Sprite.js";
import globals from "../globals.js"


export class AttackVFX extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
    }
    update() {
        // let player
        // for (let i = 0; i < globals.sprites.length; i++) {
        //     const element = globals.sprites[i];
        //     if (element.id === SpriteId.PLAYER) {
        //         player = element
        //     }
        // }
        //     sprite. yPos = player.yPos 
    
            let index = globals.sprites.indexOf(this)
            if (this.frames.frameCounter === this.frames.framesPerState-1) {
                // setTimeout(() => { globals.sprites.splice(index,1); }, 10);
                globals.sprites.splice(index,1)
            }
    
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