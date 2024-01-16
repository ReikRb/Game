import Sprite from "./Sprite.js";
import { State } from "../constants.js";
import { initPlayerAttackVFX, initPlayerFireball } from "../initialize.js";
export class LobbyPlayer extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames){
        super (id, state, xPos, yPos, imageSet, frames)

        this.shootingIntervalCounter = 0
        this.shootingInterval = 20
    }
     update() {
        console.log(this.frames.frameCounter);
        switch (this.state) {
            case State.ATTACK_RIGHT:
                this.frames.framesPerState = 8
                this.frames.speed = 3
                    if (this.frames.frameCounter / (this.frames.framesPerState) != 1 && this.shootingIntervalCounter === 0) {
                        initPlayerAttackVFX((this.xPos+78), this.yPos, State.RIGHT);
                        setTimeout(() => { initPlayerFireball((this.xPos + 78), this.yPos, State.RIGHT); }, 400);
                        
                    }
                    if (this.shootingIntervalCounter === this.shootingInterval) {
                        this.shootingIntervalCounter = 0
    
                    } else{
                        this.shootingIntervalCounter++
                    }
                break;
            case State.DEAD_RIGHT:
                    this.frames.framesPerState = 7
                    this.frames.speed = 7
                    // if (this.frames.frameCounter === (this.frames.framesPerState-1)) {
                    //     globals.gameState = Game.GAMEOVER
                    // }
                    break;

        }
        this.updateAnimationFrame()
    }
}