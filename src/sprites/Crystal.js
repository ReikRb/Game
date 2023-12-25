import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { Collision } from "../constants.js";

export class Crystal extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics) {
        super(id, state, xPos, yPos, imageSet, frames, physics)

        this.collisionBorder = Collision.NO_COLLISION
    }
    update() {

        switch (this.collisionBorder) {

            case Collision.RIGHT:
                this.physics.vx = -this.physics.vLimit;
                break;
            case Collision.LEFT:
                this.physics.vx = this.physics.vLimit;
                break;
            case Collision.UP:
                this.physics.vy = this.physics.vLimit;
                break;
            case Collision.DOWN:
                this.physics.vy = -this.physics.vLimit;
                break;

            default:
            //Si no hay colisión, mantenemos las velocidades
        }
        this.xPos += this.physics.vx * globals.deltaTime;
        this.yPos += this.physics.vy * globals.deltaTime;

        //Movimiento de rebote. Cambiamos velocidades según haya colisión con las paredes switch (this.collisionBorder)
        this.updateAnimationFrame();
        this.calculateCollisionWithFourBorders();
    }
    calculateCollisionWithFourBorders() {
        if (this.xPos + this.imageSet.xSize > globals.canvas.width) {
            this.collisionBorder = Collision.RIGHT;
        } else if (this.xPos < 0) {
            this.collisionBorder = Collision.LEFT;
        }

        else if (this.yPos < 0) {
            this.collisionBorder = Collision.UP;
        }
        else if (this.yPos + this.imageSet.ySize > globals.canvas.height) {
            this.collisionBorder = Collision.DOWN;
        }
        else {
            this.collisionBorder = Collision.NO_COLLISION;
        }
    }
}
