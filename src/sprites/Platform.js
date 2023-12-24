import Sprite from "./Sprite.js";


export class Platform extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics){
        super (id, state, xPos, yPos, imageSet, frames, physics)
    }
}