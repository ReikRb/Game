//Manages tileSet Sprite
export default class ImageSet{

    constructor (initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset){
        this.initFil       = initFil;
        this.initCol       = initCol;
        this.xSize         = xSize;
        this.ySize         = ySize;
        this.xOffset       = xOffset;
        this.yOffset       = yOffset;
        this.gridSize      = gridSize;
    }
}