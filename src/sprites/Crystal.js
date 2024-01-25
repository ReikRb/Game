import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { Collision } from "../constants.js";
import { initGravityExplosion } from "../initialize.js";

export class Crystal extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox) {
        super(id, state, xPos, yPos, imageSet, frames, physics)
        this.hitBox = hitBox
        this.collisionBorder = Collision.NO_COLLISION
        this.fadeCounter    = 0
        this.score          = 150
    }
    update() {
        this.fadeCounter++
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
        this.calculateCollisionWithFourBorders();

        let index = globals.sprites.indexOf(this)
        if (this.fadeCounter>300) {
            globals.sprites.splice(index,1)
            let xCenter = this.xPos + this.hitBox.xOffset + this.hitBox.xSize/2
            let yCenter = this.yPos + this.hitBox.yOffset + this.hitBox.ySize/2
            initGravityExplosion(xCenter, yCenter)
            globals.appearTime+=10
        }

        if (this.isCollidingWithPlayer) {
            globals.sprites.splice(index,1)
            globals.score += this.score
        }
    }
    calculateCollisionWithFourBorders() {
        const player = globals.sprites[0]
        if (this.xPos   > (player.xPos+player.imageSet.xOffset+ this.imageSet.xSize + globals.canvas.width/2)) {
            this.collisionBorder = Collision.RIGHT;
        } else if (this.xPos- this.imageSet.xSize < (player.xPos +player.imageSet.xOffset +this.imageSet.xSize  -globals.canvas.width/2)) {
            this.collisionBorder = Collision.LEFT;
        }

        else if (this.yPos < (player.yPos - globals.canvas.height/2)+ this.imageSet.ySize) {
            this.collisionBorder = Collision.UP;
        }
        else if (this.yPos + this.imageSet.ySize > (player.yPos + globals.canvas.height/2)+ this.imageSet.ySize) {
            this.collisionBorder = Collision.DOWN;
        }
        else {
            this.collisionBorder = Collision.NO_COLLISION;
        }
    }
}
