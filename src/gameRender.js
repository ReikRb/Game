import globals from "./globals.js"
import {Game} from "./constants.js"

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

function drawSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];

        renderSprite(sprite)
    }
}


function renderSprite(sprite){
    //Calculates tilemap drawing position
    const xTile = sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset
    const yTile = sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset

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
