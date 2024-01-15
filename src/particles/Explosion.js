import globals from "../globals.js";
import { ParticleState } from "../constants.js";
import  Particle  from "./Particle.js";
export default class ExplosionParticle extends Particle {
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade, colour) {
        super  (id, state, xPos, yPos, radius, alpha, physics)

        this.colour         = colour
        this.fadeCounter    = 0
        this.timeToFade     = timeToFade
    }
    update(){
        this.fadeCounter += globals.deltaTime

        switch (this.state) {
            case ParticleState.ON:
                if (this.fadeCounter > this.timeToFade) {
                    this.fadeCounter = 0
                    this.state = ParticleState.FADE
                }
                break;
        

            case ParticleState.FADE:
                this.alpha -= 0.3
                this.state = this.alpha <= 0 ? ParticleState.OFF : this.state
                break;


            case ParticleState.OFF:
                let index = globals.particles.indexOf(this)
                globals.particles.splice(index,1)
                break;

            default:

                break;
        }

    this.xPos += this.physics.vx * globals.deltaTime
    this.yPos += this.physics.vy * globals.deltaTime

    }
}