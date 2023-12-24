import Sprite from "./Sprite.js";


export class Player extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.jumpEvent = false
        this.jumpCount = 0
    }
}