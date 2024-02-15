import Sprite from "./Sprite.js";
import globals from "../globals.js"
import {State, GRAVITY, Game, Sound, SpriteId} from "../constants.js"
import { initPlayerAttackVFX,initPlayerFireball, initJumpVFX, initPower, initFire } from "../initialize.js";


export class Player extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.hitBox    = hitBox      //Sprite HitBox
        this.jumpEvent = false
        this.jumpCount = 0
        this.jumpChangeCounter = 0
        this.previousLife = 0
    }
     update() {

        //GET RESULT FROM COLISION
        if (this.physics.vy === 0 && this.isCollidingWithObstacleOnBottom ) {
            this.physics.isOnGround = true
        } 

        //Keyboard event reader
        this.readKeyboardAndAssignState();
        const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;

        this.animationCompletionCheck()

        this.damageAnimationCheck()

                                ///////////////////PLAYER STATES///////////////////
                                
        //Updates Player's variables State Switch cases
        this.playerStateActions()

                                ///////////////////MOVEMENT////////////////////////
        this.xDisplacement()

        //////////////////////// JUMPS & Y DISPLACEMENT//////////////////
        this.yDisplacement()

        /// Checks if character is Shooting/////
        this.isShooting()

        // UPDATES FRAMES AND SAVES  THIS STATE & JUMP STATE FOR NEXT LOOP
        this.updateAnimationFrame()
        this.previousState = this.state
        this.jumpEvent = globals.action.jump
    }



                                                    /////METHODS/////
    
    playerStateActions(){
        switch (this.state) {
            case State.RUN_RIGHT:
            case State.RUN_LEFT:    

                this.frameSetter()
                //If character moves right X is positive
                //If character moves left X is negative
                this.physics.ax = this.state    % 2 === 0 ? this.physics.aLimit : -this.physics.aLimit
                break;
    
            case State.IDLE_LEFT:
            case State.IDLE_RIGHT:
                this.frameSetter(6)
                this.physics.ax = 0
                this.idlingFire()
                break;
    
            case State.ATTACK_RIGHT:
            case State.ATTACK_LEFT:
                this.frameSetter()
                this.physics.vx=0
                this.attackMethod()
                break;
            
            case State.JUMP_RIGHT:
            case State.JUMP_LEFT:
            case State.FALL_LEFT:
            case State.FALL_RIGHT:
                this.frameSetter(2)
                break;
            
            case State.DEAD_RIGHT:
            case State.DEAD_LEFT:
                this.frameSetter(8,5)
                this.physics.vx = 0

                //Changes Game State if dead animation is completed(gameOverCheck method - GameLogic)
                if (this.frames.frameCounter === (this.frames.framesPerState-1)) {
                    globals.life--
                }
                break;
            
            case State.DAMAGED_RIGHT:
            case State.DAMAGED_LEFT:
                const displacementDirectionPower = this.state    % 2 === 0 ? 1000 : -1000

                this.frameSetter(4, 5)
                this.damagedDisplacement()
                    break;
        }
    }

    xDisplacement(){
                ///////////////////////X Speed Calculation//////////////
                this.physics.vx += this.physics.ax * globals.deltaTime;

                /////// X Acceleration & Displacement(velocity) /////
                if ((this.state === State.RUN_LEFT && this.physics.vx  > 0) ||
                    (this.state === State.RUN_RIGHT && this.physics.vx < 0) ||
                    (!isLeftOrRightPressed)) {
                    this.physics.vx *= this.physics.friction;
                }
        
                //////// X CAP ////////
                    if (this.physics.vx > this.physics.vLimit) {
                        this.physics.vx = this.physics.vLimit
                    } else if (this.physics.vx < -this.physics.vLimit) {
                        this.physics.vx =- this.physics.vLimit;
                    }    
                
        
                //Calculates result movement in X
                this.xPos += this.physics.vx * globals.deltaTime
        
    }

    yDisplacement(){
                ///////////////////////  Y Speed Calculation//////////////
        this.physics.ay = GRAVITY;
        this.physics.vy += this.physics.ay * globals.deltaTime;

                ////////////// JUMP & DOUBLE JUMP/////////
        if (this.jumpCount ===1) {
            this.jumpChangeCounter++
        }

        if (this.physics.isOnGround) {
            this.jumpCount = 0
            this.jumpChangeCounter = 0

            if (globals.action.jump) {
                this.physics.isOnGround = false;
                this.physics.isOnPlatform = false
                this.physics.vy += this.physics.jumpForce;
                this.jumpCount++
                globals.currentSound = Sound.JUMP

            } else if ( globals.action.jump != this.jumpEvent){
                this.physics.vy += this.physics.jumpForce;
                this.jumpCount++

            }
        } else if (!this.physics.isOnGround && globals.power) {
            if (globals.action.jump && this.jumpChangeCounter >17) {
                
                this.physics.vy = this.physics.jumpForce;
                this.jumpCount++
                globals.power = false
                initJumpVFX(this.xPos, this.yPos)
                globals.currentSound = Sound.JUMP
            }
        }

        //Caps falling speed only
        if (this.physics.vy > 300) {
            this.physics.vy = 300
        }

        //Calculates movement in Y
        this.yPos += this.physics.vy * globals.deltaTime;
    }

    frameSetter(framesPerState = 8, frameSpeed = 3, frameCounter = null){
        this.frames.framesPerState = framesPerState
        this.frames.speed = frameSpeed

        if (frameCounter != null) 
            this.frames.frameCounter = frameCounter
    }

    idlingFire(){
        const fireModifier = this.state % 2 === 0 ? 10 : -5
        if (this.previousState != this.state ) {
            const xFirePos = this.xPos+this.hitBox.xOffset + fireModifier
            const yFirePos = this.yPos+this.hitBox.yOffset + fireModifier
            initFire(xFirePos, yFirePos)
        }
    }

    damagedDisplacement(){
        if (globals.damagedCounter ===1 && !globals.inmune) {
            this.physics.vy = 0
            this.physics.vy += this.physics.jumpForce/1.4
        }

        if (this.physics.vy != 0 && !globals.inmune) {
            this.physics.vx = displacementDirectionPower
        }  else {
            globals.inmune = true
        }
    }
    
    attackMethod(){
        const xModifierVFX = this.state % 2 === 0 ? 78 : -42
        const direction = this.state    % 2 === 0 ? State.RIGHT : State.LEFT

        //Resets shooting CD if not attacking
        if (this.previousState != this.state) {
            this.physics.shootingIntervalCounter = 0
        }
        //Creates the attack sprite & fireball at an exact frame to match animation
        if (this.frames.frameCounter / (this.frames.framesPerState-1) != 1 && this.physics.shootingIntervalCounter === 0) {
            initPlayerAttackVFX((this.xPos + xModifierVFX), this.yPos, direction);
            setTimeout(() => { initPlayerFireball((this.xPos + xModifierVFX), this.yPos, direction); }, 400);
        }
        
        //increases shooting CD counter untill requirement mets. Then resets it
        if (this.physics.shootingIntervalCounter === this.physics.shootingInterval) {
            this.physics.shootingIntervalCounter = 0
            
        } else {
            this.physics.shootingIntervalCounter++
        }
    }

    damageAnimationCheck(){
        if (!globals.inmune) {
            for (let i = 0; i < globals.sprites.length; i++) {
                const sprite = globals.sprites[i];
                if (sprite.isCollidingWithPlayer) {
                    if ( sprite.id === SpriteId.SKELETON ||sprite.id === SpriteId.SPIKE) {
                        if ((this.xPos+this.hitBox.xOffset + (this.hitBox.xSize/2))              > 
                            (sprite.xPos+sprite.hitBox.xOffset + (sprite.hitBox.xSize/2)) ) {
                            
                            this.state = State.DAMAGED_LEFT
                        } else if ((this.xPos+this.hitBox.xOffset + (this.hitBox.xSize/2))              < 
                                   (sprite.xPos+sprite.hitBox.xOffset + (sprite.hitBox.xSize/2))) {
                            this.state = State.DAMAGED_RIGHT
                        }
                    }  
                }

            }
            
        }
    }

    animationCompletionCheck(){
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
        } else if (this.previousState === State.DAMAGED_RIGHT && !globals.inmune){
            this.state = State.DAMAGED_RIGHT
        } else if (this.previousState === State.DAMAGED_LEFT && !globals.inmune){
            this.state = State.DAMAGED_LEFT
        }
    }

    readKeyboardAndAssignState() {
        if (globals.life <= 0) {
                this.state =    this.previousState % 2 === 0     ? this.state = State.DEAD_RIGHT : this.state = State.DEAD_LEFT
        }else  {

            if (!this.physics.isOnGround) {
                this.state =    this.physics.vy > 0             && this.physics.vx > 0                 ? State.FALL_RIGHT      :
                                this.physics.vy > 0             && this.physics.vx < 0                 ? State.FALL_LEFT       :
                                this.physics.vy < 0             && this.physics.vx > 0                 ? State.JUMP_RIGHT      :
                                this.physics.vy < 0             && this.physics.vx < 0                 ? State.JUMP_LEFT       :
                                this.physics.vy < 0             && State.IDLE_RIGHT                    ? State.JUMP_RIGHT      :
                                this.physics.vy < 0             && State.IDLE_LEFT                     ? State.JUMP_LEFT       :
                                this.state          
                                
                            } else {
            if (this.physics.isShooting) {
                this.state =  globals.action.fire               && this.state  === State.IDLE_RIGHT    ? State.ATTACK_RIGHT    : 
                                globals.action.fire             && this.state  === State.ATTACK_RIGHT  ? State.ATTACK_RIGHT    :
                                globals.action.fire             && this.state  === State.IDLE_LEFT     ? State.ATTACK_LEFT     : 
                                globals.action.fire             && this.state  === State.ATTACK_LEFT   ? State.ATTACK_LEFT     :
                                this.state        === State.ATTACK_LEFT                                ? State.IDLE_LEFT       :
                                this.state;
                
                            } else {
                                this.state =    
                                globals.action.moveRight                                               ? State.RUN_RIGHT       :    //Right key
                                globals.action.moveLeft                                                ? State.RUN_LEFT        :    //Left key
                                this.physics.vy   === 0       && this.state  === State.FALL_RIGHT      ? State.IDLE_RIGHT      :
                                this.physics.vy   === 0       && this.state  === State.FALL_LEFT       ? State.IDLE_LEFT       :
                                this.state        === State.RUN_LEFT                                   ? State.IDLE_LEFT       :    //No key state left
                                this.state        === State.RUN_RIGHT                                  ? State.IDLE_RIGHT      :    //No key state right
                                this.state % 2    === 0                                                ? State.IDLE_RIGHT      :
                                this.state % 2    === 1                                                ? State.IDLE_LEFT       :
                                this.state;
                                
                            }
                            
                        }
                        
                    }
                }

    isShooting() {
    if (globals.action.fire) {
        this.physics.isShooting = true
    } else {
        this.physics.isShooting = false
    }
    }

}



//In-Game Sprites Functions