import Sprite from "./Sprite.js";
export class LobbyPlayer extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)
    }
     update() {
        this.updateAnimationFrame()
    }
}