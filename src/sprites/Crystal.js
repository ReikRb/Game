import Sprite from "./Sprite.js";

import { Collision } from "../constants.js";

export class Crystal extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics){
        super (id, state, xPos, yPos, imageSet, frames, physics)

        this.collisionBorder = Collision.NO_COLLISION
    }
}