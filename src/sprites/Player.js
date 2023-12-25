import Sprite from "./Sprite.js";
import globals from "../globals.js"
import {State, GRAVITY} from "../constants.js"
import { initPlayerAttackVFX,initPlayerFireball } from "../initialize.js";


export class Player extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.jumpEvent = false
        this.jumpCount = 0
    }
     update() {
        
        //Keyboard event reader
        this.readKeyboardAndAssignState();
        const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;
        if        (this.previousState === State.ATTACK_RIGHT && this.frames.frameCounter / (this.frames.framesPerState-1) !=  1) {
            this.state = State.ATTACK_RIGHT
            this.physics.isShooting = true
        } else if (this.previousState === State.ATTACK_RIGHT && this.frames.frameCounter / (this.frames.framesPerState-1) === 1){
            this.frames.frameCounter = 0
            this.frames.frameChangeCounter = 0
            this.physics.shootingIntervalCounter = 0
        } else if (this.previousState === State.ATTACK_LEFT  && this.frames.frameCounter / (this.frames.framesPerState-1) !=  1) {
            this.state = State.ATTACK_LEFT
            this.physics.isShooting = true
        } else if (this.previousState === State.ATTACK_LEFT  && this.frames.frameCounter / (this.frames.framesPerState-1) === 1){
            this.frames.frameCounter = 0
            this.frames.frameChangeCounter = 0
            this.physics.shootingIntervalCounter = 0
        }
        
        //Updates Player's variables State
        switch (this.state) {
            case State.RUN_RIGHT:
                this.frames.framesPerState = 8
                
                //If character moves right X is positive
                this.physics.ax = this.physics.aLimit;
                break;
    
            case State.RUN_LEFT:
                this.frames.framesPerState = 8
                
                //If character moves left X is negative
                this.physics.ax = -this.physics.aLimit;
            break;
    
            case State.IDLE_LEFT:
            case State.IDLE_RIGHT:
                this.frames.framesPerState = 6
                
                this.physics.ax = 0
                break
    
            case State.ATTACK_RIGHT:
                this.frames.framesPerState = 8
                if (this.previousState != State.ATTACK_RIGHT) {
                    this.physics.shootingIntervalCounter = 0
                }
                    if (this.frames.frameCounter / (this.frames.framesPerState-1) != 1 && this.physics.shootingIntervalCounter === 0) {
                        initPlayerAttackVFX((this.xPos+78), this.yPos, State.RIGHT);
                        setTimeout(() => { initPlayerFireball((this.xPos + 78), this.yPos, State.RIGHT); }, 400);
                    }
                    if (this.physics.shootingIntervalCounter === this.physics.shootingInterval) {
                        this.physics.shootingIntervalCounter = 0
    
                    } else{
                        this.physics.shootingIntervalCounter++
                    }
                break;
    
            case State.ATTACK_LEFT:
                this.frames.framesPerState = 8
                if (this.previousState != State.ATTACK_LEFT) {
                    this.physics.shootingIntervalCounter = 0
                }
                    if (this.frames.frameCounter / (this.frames.framesPerState-1) != 1 && this.physics.shootingIntervalCounter === 0) {
                        initPlayerAttackVFX((this.xPos+-22), this.yPos, State.LEFT);
                        setTimeout(() => { initPlayerFireball((this.xPos + -22), this.yPos, State.LEFT); }, 400);
                    }
                    if (this.physics.shootingIntervalCounter === this.physics.shootingInterval) {
                        this.physics.shootingIntervalCounter = 0
    
                    } else{
                        this.physics.shootingIntervalCounter++
                    }
                break;
            
            case State.JUMP_RIGHT:
            case State.JUMP_LEFT:
            case State.FALL_LEFT:
            case State.FALL_RIGHT:
                this.frames.framesPerState = 2
                this.frames.frameCounter = 0
                break;
    
        }
    
        //XY Speed Calculation
        this.physics.vx += this.physics.ax * globals.deltaTime;
    
        if ((this.state === State.RUN_LEFT && this.physics.vx  > 0) ||
            (this.state === State.RUN_RIGHT && this.physics.vx < 0) ||
            (!isLeftOrRightPressed)) {
            this.physics.vx *= this.physics.friction;
        }
    
        if (this.physics.vx > this.physics.vLimit) {
            this.physics.vx = this.physics.vLimit
        } else if (this.physics.vx < -this.physics.vLimit) {
            this.physics.vx =- this.physics.vLimit;
        }
    
        //Calculates movement in X
        this.xPos += this.physics.vx * globals.deltaTime
    
        this.calculateShoot()
        const isCollision = this.calculateCollisionWithBorders()
        if (isCollision) {
            this.xPos -= this.physics.vx * globals.deltaTime
        }
    
        
        this.physics.ay = GRAVITY;
        
        if (!this.physics.isOnGround) {
            this.physics.vy += this.physics.ay * globals.deltaTime;
        } else {
            if (globals.action.jump) {
                this.physics.isOnGround = false;
                this.physics.vy += this.physics.jumpForce;
            } else if ( globals.action.jump != this.jumpEvent){
                this.physics.vy += this.physics.jumpForce;
            }
        }
        
        this.yPos += this.physics.vy * globals.deltaTime;
        
        if (this.yPos > globals.canvas.height - this.imageSet.ySize) {
            this.physics.isOnGround = true;
    
            this.yPos = globals.canvas.height - this.imageSet.ySize;
            this.physics.vy = 0;
        }
        this.updateAnimationFrame()
    
        this.previousState = this.state
        this.jumpEvent = globals.action.jump
    }

    readKeyboardAndAssignState() {
    
        if (!this.physics.isOnGround) {
                this.state =  this.physics.vy > 0           && this.physics.vx > 0                 ? State.FALL_RIGHT      :
                                this.physics.vy > 0           && this.physics.vx < 0                 ? State.FALL_LEFT       :
                                this.physics.vy < 0           && this.physics.vx > 0                 ? State.JUMP_RIGHT      :
                                this.physics.vy < 0           && this.physics.vx < 0                 ? State.JUMP_LEFT       :
                                this.physics.vy < 0           && State.IDLE_RIGHT                      ? State.JUMP_RIGHT      :
                                this.physics.vy < 0           && State.IDLE_LEFT                       ? State.JUMP_LEFT       :
                                this.state          
            
        } else {
            if (this.physics.isShooting) {
                this.state =  globals.action.fire             && this.state  === State.IDLE_RIGHT    ? State.ATTACK_RIGHT    : 
                                globals.action.fire             && this.state  === State.ATTACK_RIGHT  ? State.ATTACK_RIGHT    :
                                globals.action.fire             && this.state  === State.IDLE_LEFT     ? State.ATTACK_LEFT     : 
                                globals.action.fire             && this.state  === State.ATTACK_LEFT   ? State.ATTACK_LEFT     :
                                this.state        === State.ATTACK_LEFT                                ? State.IDLE_LEFT       :
                                this.state;
                
            } else {
                this.state =    
                                globals.action.moveRight                                                 ? State.RUN_RIGHT       :    //Right key
                                globals.action.moveLeft                                                  ? State.RUN_LEFT        :    //Left key
                                this.physics.vy   === 0       && this.state  === State.FALL_RIGHT    ? State.IDLE_RIGHT      :
                                this.physics.vy   === 0       && this.state  === State.FALL_LEFT     ? State.IDLE_LEFT       :
                                this.state        === State.RUN_LEFT                                   ? State.IDLE_LEFT       :    //No key state left
                                this.state        === State.RUN_RIGHT                                  ? State.IDLE_RIGHT      :    //No key state right
                                this.state % 2    === 0                                                ? State.IDLE_RIGHT      :
                                this.state % 2    === 1                                                ? State.IDLE_LEFT       :
                                this.state;
    
            }
           
        }
                        
    }
    calculateShoot() {
        if (globals.action.fire) {
            this.physics.isShooting = true
        } else {
            this.physics.isShooting = false
        }
    }

}



//In-Game Sprites Functions