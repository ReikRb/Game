
//Manages Sprite Class

export default class Sprite{

    constructor(id, state, xPos, yPos, imageSet, frames, physics){
        this.id       = id;         //Which Sprite
        this.state    = state;      //Which Action
        this.xPos     = xPos;       //X Position
        this.yPos     = yPos;       //Y Position
        this.imageSet = imageSet;   //Sprite Image Data
        this.frames   = frames;     //Frame Animation Data
        this.physics  = physics     //Physics Data
        this.previousState = state

    }
}


