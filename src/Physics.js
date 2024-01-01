export default class Physics {
    constructor(vLimit, aLimit = 0, friction = 1, jumpForce = 0){
        this.vx         = 0;        //Actual Speed in X (pixels/s)
        this.vy         = 0;        //Actual Speed in Y (pixels/s)
        this.vLimit     = vLimit;   //Max Speed
        this.ax         = 0;
        this.ay         = 0;
        this.aLimit     = aLimit;
        this.friction   = friction;
        this.jumpForce  = jumpForce
        this.isOnGround = true
        this.isShooting = false
        this.hasShoot   = false
        this.shootingIntervalCounter = 0;
        this.shootingInterval = 20;
    }
}
export class PlayerPhysics extends Physics {
    constructor(vLimit, aLimit = 0, friction = 1, jumpForce = 0) {
        super(vLimit, aLimit, friction, jumpForce); 
        this.vx         = 0;        //Actual Speed in X (pixels/s)
        this.vy         = 0;        //Actual Speed in Y (pixels/s)
        this.vLimit     = vLimit;   //Max Speed
        this.ax         = 0;
        this.ay         = 0;
        this.jumpForce  = jumpForce
        this.isOnGround = true
        this.isOnPlatform = false
        this.isShooting = false
        this.hasShoot   = false
        this.shootingIntervalCounter = 0;
        this.shootingInterval = 20;
    }
}
export class UniformHorizontalMove extends Physics {
    constructor(vLimit, aLimit = 0, friction = 1) {
        super(vLimit, aLimit, friction); 
        this.vx         = 0;        //Actual Speed in X (pixels/s)
        this.vy         = 0;        //Actual Speed in Y (pixels/s)
        this.vLimit     = vLimit;   //Max Speed
    }
}
export class Eliptic extends Physics {
    constructor(vLimit, aLimit = 0, friction = 1, omega = 0, angle = 0, xRotCenter = 100, yRotCenter = 100) {
        super(vLimit, aLimit, friction); 
        this.omega = omega;
        this.angle = angle;
        this.xRotCenter = xRotCenter;
        this.yRotCenter = yRotCenter;
    }
}
