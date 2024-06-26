import Sprite from "./Sprite.js";
import globals from "../globals.js"
import { State, GRAVITY } from "../constants.js"
import { initCrystal } from "../initialize.js";
export class Skeleton extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, hp, score) {
        super(id, state, xPos, yPos, imageSet, frames, physics)
        this.hitBox = hitBox      //Sprite HitBox
        this.life = hp
        this.score = score

    }
    update() {
        this.isCollidingWithObstacleOnRight = false
        this.isCollidingWithObstacleOnLeft = false
        if (this.life <= 0) {
            this.state = this.state % 2 === 0 ? State.DEAD_RIGHT_2 : State.DEAD_LEFT_2
        }
        switch (this.state) {
            case State.RUN_RIGHT_2:
                this.frames.framesPerState = 7
                this.hitBox.xSize = 35
                this.hitBox.xOffset = 45
                //If character moves right X is positive
                this.physics.vx = this.physics.vLimit;
                break;

            case State.RUN_LEFT_2:
                this.frames.framesPerState = 7
                this.hitBox.xSize = 35
                this.hitBox.xOffset = 45
                //If character moves left X is negative
                this.physics.vx = -this.physics.vLimit;
                break;
            case State.ATTACK_LEFT_2:
                this.frames.framesPerState = 4
                //If character moves left X is negative
                this.physics.vx = 0;
                if (this.frames.frameCounter === 1) {
                    this.hitBox.xSize = 80
                    this.hitBox.xOffset = 0

                }
                if (this.frames.frameCounter === 3) {
                    this.state = State.RUN_LEFT_2
                    this.hitBox.xSize = 35
                    this.hitBox.xOffset = 45
                }

                break;
            case State.ATTACK_RIGHT_2:
                this.frames.framesPerState = 4
                //If character moves left X is negative
                this.physics.vx = 0;
                if (this.frames.frameCounter === 1) {
                    this.hitBox.xSize = 80
                    this.hitBox.xOffset = 45


                } else if (this.frames.frameCounter === 3) {
                    this.state = State.RUN_RIGHT_2
                    this.hitBox.xSize = 35
                    this.hitBox.xOffset = 45

                }
                break;
            case State.DEAD_RIGHT_2:
            case State.DEAD_LEFT_2:
                this.frames.framesPerState = 4
                this.physics.vx = 0
                if (this.frames.frameCounter === 3) {
                    let index = globals.sprites.indexOf(this)
                    globals.sprites.splice(index, 1)
                    globals.score += this.score
                    const random = Math.floor(Math.random() * 4)
                    if (random === 0) 
                        initCrystal(this.xPos, this.yPos)

                }
                break;
            default:
                console.error("Error: State invalid");
        }

        //Updates Skeleton's variables State
        const player = globals.sprites[0]
        let rangeX = Math.floor(player.xPos - this.xPos)
        let rangeY = Math.floor(player.yPos - this.yPos)
        rangeX *= rangeX < 0 ? -1 : 1
        rangeY *= rangeY < 0 ? -1 : 1

        if (this.xPos > player.xPos) {
            if (rangeX < 80 && rangeY < 90 && this.life > 0) {
                this.state = State.ATTACK_LEFT_2
            }
        } else if (this.xPos < player.xPos) {
            if (rangeX < 75 && rangeY < 90 && this.life > 0) {
                this.state = State.ATTACK_RIGHT_2
            }

        }

        //Calculates movement in X
        this.xPos += this.physics.vx * globals.deltaTime

        this.physics.ay = GRAVITY;
        this.physics.vy += this.physics.ay * globals.deltaTime;
        this.yPos += this.physics.vy * globals.deltaTime;

        this.updateAnimationFrame()

        this.previousState = this.state

    }

}