import Sprite from "./Sprite.js";

export class Skeleton extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.directionChangeCounter     = 0;
        this.maxTimeToChangeDirection   = maxTimeToChangeDirection;
    }
}