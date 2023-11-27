import globals from "./globals.js"
import {Game} from "./constants.js"
import { Tile } from "./constants.js";
//Graphic Renderer Method
export default function render(){

    //Modifies Game Depending On Game State
    switch(globals.gameState){
        case Game.LOADING:
            //Draws Loading
            break;
        
        case Game.PLAYING:
            drawGame();
            break;
        
        default:
            console.error("Error: Game State invalid")

    }
}

function drawGame(){

    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)


    // //Draws FPS in Screen
    // globals.ctx.fillText("FPS: " + (1 / globals.deltaTime), 30, 30)

    //Draw Elements
    drawSprites();
}

//Map Drawer Method
function renderMap() {
    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    //Draws Map
    const num_fil = levelData.length;
    const num_col = levelData[0].length;

    for (let i = 0; i < num_fil; i++) {
        for (let j = 0; j < num_col; j++) {

            const xTile = (levelData[i][j] - 1) * brickSize;
            const yTile = 0;
            const xPos  = j * brickSize
            const yPos  = i * brickSize


            //Draws new Sprite's Frame at proper position
            globals.ctx.drawImage(
                globals.tileSets[Tile.SIZE_32],  //Img file
                xTile, Ytile,                    //X & Y Position Source
                brickSize, brickSize,            //Height & Width Source
                xPos, yPos ,                     //X & Y Position Destination
                brickSize, brickSize             //Height and Width Destination
            );
        }
        
    }
}


function drawSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];

        renderSprite(sprite)
    }
}


function renderSprite(sprite){

    //Sets initial tile position
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    //Sets tilemap drawing position
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset

    // Sprites position rounded down
    const xPos = Math.floor(sprite.xPos)
    const yPos = Math.floor(sprite.yPos)

    //Draws new frame on proper position
    globals.ctx.drawImage(
        globals.tileSet,                                //Img File
        xTile, yTile,                                   //X & Y Position Source
        sprite.imageSet.xSize, sprite.imageSet.ySize,   //Height & Width Source
        xPos, yPos,                                     //Final X & Y Position
        sprite.imageSet.xSize, sprite.imageSet.ySize    //Final Height & Width
    )
}
