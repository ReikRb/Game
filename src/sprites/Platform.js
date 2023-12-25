import Sprite from "./Sprite.js";
import globals from "../globals.js"

export class Platform extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics){
        super (id, state, xPos, yPos, imageSet, frames, physics)
    }
    update(){
            //Updates Platform's variables State
            this.physics.angle += this.physics.omega * globals.deltaTime
        
            this.setPlatformPosition()
        }
        
        
        
        setPlatformPosition(){
       // x = xCenter + Acos(angle)
       // y = yCenter + Asin(angle)
       
           const radius = 65;
       
           this.xPos = this.physics.xRotCenter + radius * Math.cos(this.physics.angle)
           this.yPos = this.physics.yRotCenter + radius * Math.sin(this.physics.angle)
       
           this.xPos -= this.imageSet.xSize/2
           this.yPos -= this.imageSet.ySize/2
    }
}