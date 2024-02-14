import globals from "../globals.js";
import { ParticleState, GRAVITY } from "../constants.js";
import Particle from "./Particle.js";

export default class BubbleParticle extends Particle {
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade) {
        super(id, state, xPos, yPos, radius, alpha, physics)

        this.colour         = 'lightgray'
        this.fadeCounter    = 0
        this.timeToFade     = timeToFade
        this.physics.ay     = GRAVITY
    }

    update() {
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
                globals.particles.splice(index, 1)
                break;

            default:

                break;
        }

        this.physics.vx += this.physics.ax * globals.deltaTime
        // this.physics.vy += this.physics.ay * globals.deltaTime;

        const velModule = Math.sqrt(Math.pow(this.physics.vx, 2) + Math.pow(this.physics.vy, 2))

        if (velModule < 1) {
            this.physics.vx = 0
            this.physics.vy = 0
        }

        this.xPos += this.physics.vx * globals.deltaTime
        this.yPos += this.physics.vy * globals.deltaTime

    }
}