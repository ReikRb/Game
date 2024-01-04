import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { State } from "../constants.js";


export class AttackVFX extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
    }
    update() { 
        const player = globals.sprites[0]
        if (this.state === State.RIGHT) {
            this.xPos = player.xPos+78
            this.yPos = player.yPos
        } else{
            this.xPos = player.xPos-22
            this.yPos = player.yPos
        }
            let index = globals.sprites.indexOf(this)
            if (this.frames.frameCounter === this.frames.framesPerState-1) {
                // setTimeout(() => { globals.sprites.splice(index,1); }, 10);
                globals.sprites.splice(index,1)
            }
    
        this.updateAnimationFrame()
    }
}