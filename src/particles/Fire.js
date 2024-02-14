import globals from "../globals.js";
import { ParticleState, State } from "../constants.js";
import Particle from "./Particle.js";
import { createFireParticle } from "../initialize.js";
export default class FireParticle extends Particle {
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade, colour) {
        super(id, state, xPos, yPos, radius, alpha, physics)

        this.colour         = colour
        this.fadeCounter    = 0
        this.timeToFade     = timeToFade
    }

    update() {


        const player = globals.sprites[0]
        switch (this.state) {
            case ParticleState.ON:
                this.radius -= 0.1
                if (this.radius < 2) {
                    this.state = ParticleState.FADE
                }
                if (player.state > 1) {
                    this.state = ParticleState.OFF
                }
                break;


            case ParticleState.FADE:
                this.alpha -= 0.3
                this.state = this.alpha <= 0 ? ParticleState.OFF : this.state
                if (player.state > 1) {
                    this.state = ParticleState.OFF
                }
                break;


            case ParticleState.OFF:
                let index = globals.particles.indexOf(this)
                globals.particles.splice(index, 1)

                if (player.state < 2) { // ONLY WHEN PLAYER IS IDLING
                    let xFirePos
                    let yFirePos
                    if (player.state === State.IDLE_RIGHT) {
                        xFirePos = player.xPos + player.hitBox.xOffset + 36
                        yFirePos = player.yPos + player.hitBox.yOffset + 10

                    } else {
                        xFirePos = player.xPos + player.hitBox.xOffset - 5
                        yFirePos = player.yPos + player.hitBox.yOffset + 10
                    }

                    createFireParticle(xFirePos, yFirePos)

                }
                break;

            default:

                break;
        }

        this.xPos += this.physics.vx * globals.deltaTime
        this.yPos += this.physics.vy * globals.deltaTime

    }
}