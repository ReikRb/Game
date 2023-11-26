//Manages tileSet Sprite
export default class ImageSet{

    constructor (xSize, ySize, gridSize, xOffset, yOffset){
        this.xSize         = xSize;
        this.ySize         = ySize;
        this.xOffset       = xOffset;
        this.yOffset       = yOffset;
        this.gridSize      = gridSize;
    }
}