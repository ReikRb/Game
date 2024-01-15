export default class Particle {
    constructor(id, state, xPos, yPos, radius, alpha, physics){
        this.id             = id
        this.state          = state
        this.xPos           = xPos
        this.yPos           = yPos
        this.radius         = radius
        this.alpha          = alpha     // Transparency
        this.physics        = physics   
    }
}

