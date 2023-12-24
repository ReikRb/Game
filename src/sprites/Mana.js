import Sprite from "./Sprite.js";


export class Mana extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
        this.HUD = true
    }
}