import Sprite from "./Sprite.js";


export class Life extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
}