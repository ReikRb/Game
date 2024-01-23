import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { Game } from "../constants.js";

export class Door extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames,hitBox, isFinalDoor = false){
        super (id, state, xPos, yPos, imageSet, frames)
        this.hitBox = hitBox
        this.isFinalDoor = isFinalDoor
    }
    update(){
        if (this.isCollidingWithPlayer && globals.key) {
            if (this.frames.frameCounter ===3) {
                let index = globals.sprites.indexOf(this)
                globals.sprites.splice(index,1)
                globals.key = false
                
                if (this.isFinalDoor) {
                    globals.gameState = Game.WIN
                }
            }else{
                this.updateAnimationFrame()
            }
        }
        
    }
}