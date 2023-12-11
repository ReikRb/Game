export default class Physics {
    constructor(vLimit){
        this.vx     = 0;        //Actual Speed in X (pixels/s)
        this.vy     = 0;        //Actual Speed in Y (pixels/s)
        this.vLimit = vLimit;   //Max Speed
    }
}