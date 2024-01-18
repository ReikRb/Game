import globals from "../globals.js";
import { ParticleState, GRAVITY } from "../constants.js";
import  Particle  from "./Particle.js";
import { initStarParticle } from "../initialize.js";

export default class MenuParticle extends Particle {
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade) {
        super  (id, state, xPos, yPos, radius, alpha, physics)

        this.colour         = 'lightblue'
        this.fadeCounter    = 0
        this.timeToFade     = timeToFade
        this.initX     = xPos
        this.initY     = yPos
    }

    update(){
        let xPosition = this.checkPositionX()
        let yPosition = (globals.position-1) * 40 

        this.physics.angle += this.physics.omega * globals.deltaTime

        const radius = 5;
            
        this.xPos = this.physics.xRotCenter + radius * Math.cos(this.physics.angle) + xPosition
        this.yPos = this.physics.yRotCenter + radius * Math.sin(this.physics.angle) + yPosition
    
        this.xPos -= this.radius/2
        this.yPos -= this.radius/2
    }

    checkPositionX(){
        let value

        switch (globals.position) {
            case 1:
            case 3:
                value = -10
                break;
            case 2:
                value = -75
                break;

            case 4:
                value =  50
                break;
        
            default:
                value =  0
                break;
        }
        return value
    }
}

