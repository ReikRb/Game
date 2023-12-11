export default class Frames {
    constructor(framesPerState, speed = 1){

        this.framesPerState     = framesPerState; //Frames Quantity of Animation State
        this.frameCounter       = 0;              // Frames counter
        this.speed              = speed;          //Frame change speed (Min: 1 -- The higher the number, the slower it goes)
        this.frameChangeCounter = 0               //Frame changer speed counter
    }
}