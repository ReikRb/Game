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
globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)


    // //Draws FPS in Screen
    // globals.ctx.fillText("FPS: " + (1 / globals.deltaTime), 30, 30)

    //Draws Map (Level)
    renderMap();

    //Draw Elements
    renderSprites();

    //Draw HUD
    renderHUD();


}


function renderHUD() {
    //Raw Data
    const score     = 1154700;
    const highScore = 1200000;
    const life      = 40;
    const time      = 3000;

    //Draw Score
    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "red";
    globals.ctxHUD.fillText("SCORE", 0, 35);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText("" + score, 0, 45);
    
    //Draw High Score
    globals.ctxHUD.fillStyle = "red";
    globals.ctxHUD.fillText("HIGHSCORE", 0, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText("" + highScore, 0, 16);


    renderSpritesHUD()
}

//Map Drawer Method
function renderMap() {
    const brickSize     = globals.level.imageSet.gridSize;
    const levelData     = globals.level.data;
    const tileSetColNum = 9;
    //Draws Map
    const num_fil = levelData.length;
    const num_col = levelData[0].length;

    for (let i = 0; i < num_fil; i++) {
        for (let j = 0; j < num_col; j++) {

            const xTile =           (levelData[i][j] % tileSetColNum - 1) * brickSize;
            const yTile = Math.floor(levelData[i][j] / tileSetColNum) * brickSize;
            const xPos  = j * brickSize
            const yPos  = i * brickSize


            //Draws new Sprite's Frame at proper position
            globals.ctx.drawImage(
                globals.tileSets[Tile.SIZE_32],  //Img file
                xTile, yTile,                    //X & Y Position Source
                brickSize, brickSize,            //Height & Width Source
                xPos, yPos ,                     //X & Y Position Destination
                brickSize, brickSize             //Height and Width Destination
            );
        }
        
    }
}


function renderSprites() {
    for (let i = globals.SpritesHUD; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        // drawSpriteRectangle(sprite)
        renderSprite(sprite)
    }
}

function renderSpritesHUD() {
    for (let i = 0; i < globals.SpritesHUD; i++) {
        const sprite = globals.sprites[i];
        // drawSpriteRectangle(sprite)
        renderSpriteHUD(sprite)
    }
}

function drawSpriteRectangle(sprite) {
    const x1 = Math.floor(sprite.xPos)
    const y1 = Math.floor(sprite.yPos)
    const w1 = sprite.imageSet.xSize
    const h1 = sprite.imageSet.ySize

    globals.ctx.fillStyle = "green"
    globals.ctx.fillRect(x1, y1, w1, h1)
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
        globals.tileSets[Tile.SIZE_64],                 //Img File
        xTile, yTile,                                   //X & Y Position Source
        sprite.imageSet.xSize, sprite.imageSet.ySize,   //Height & Width Source
        xPos, yPos,                                     //Final X & Y Position
        sprite.imageSet.xSize, sprite.imageSet.ySize    //Final Height & Width
    )
}

function renderSpriteHUD(sprite){

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
    // globals.ctxHUD.scale(2,2)
    globals.ctxHUD.drawImage(
        globals.tileSets[Tile.SIZE_64],                 //Img File
        xTile, yTile,                                   //X & Y Position Source
        sprite.imageSet.xSize, sprite.imageSet.ySize,   //Height & Width Source
        xPos, yPos,                                     //Final X & Y Position
        sprite.imageSet.xSize, sprite.imageSet.ySize    //Final Height & Width
    )
}
