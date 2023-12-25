import Sprite from "./Sprite.js";
import globals from "../globals.js"


export class AttackVFX extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
    }
    update() { 
    
            let index = globals.sprites.indexOf(this)
            if (this.frames.frameCounter === this.frames.framesPerState-1) {
                // setTimeout(() => { globals.sprites.splice(index,1); }, 10);
                globals.sprites.splice(index,1)
            }
    
        this.updateAnimationFrame()
    }
}