import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class Platform extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox,type, maxRange=100){
        super (id, state, xPos, yPos, imageSet, frames, physics)
        this.hitBox    = hitBox      //Sprite HitBox
        this.type      = type
        this.maxRange  = maxRange
        this.initX     = xPos
        this.initY     = yPos
    }
    update(){
            //Updates Platform's variables State
            this.physics.angle += this.physics.omega * globals.deltaTime
        
            this.setPlatformPosition()
        }
        
        
        
        setPlatformPosition(){
       // x = xCenter + Acos(angle)
       // y = yCenter + Asin(angle)

       switch (this.type) {
           case 1:
            if (this.physics.vy >= 0) {
                this.physics.vy = this.physics.vLimit; 
            }
            if (this.yPos > (this.initY +this.maxRange)||
                 this.yPos < (this.initY -this.maxRange)) {
                this.physics.vy *= -1
        } 
            this.yPos += this.physics.vy * globals.deltaTime
               break;
               
            case 2:
                if (this.physics.vx >= 0) {
                    this.physics.vx = this.physics.vLimit; 
                }
                if (this.xPos > (this.initX +this.maxRange)||
                this.xPos < (this.initX -this.maxRange)) {
               this.physics.vx *= -1
       } 
                this.xPos += this.physics.vx * globals.deltaTime
                break;    
                   
            default:
                const radius = 65;
            
                this.xPos = this.physics.xRotCenter + radius * Math.cos(this.physics.angle)
                this.yPos = this.physics.yRotCenter + radius * Math.sin(this.physics.angle)
            
                this.xPos -= this.imageSet.xSize/2
                this.yPos -= this.imageSet.ySize/2
                break;
        
        }
    
    }
}