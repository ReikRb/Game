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