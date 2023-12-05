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
        case Game.LOAD_MAIN_MENU:
            drawMenu();
            break;

        case Game.MAIN_MENU:
            drawMenu();
            break;

        case Game.HIGHSCORE:
            drawHighScore();
            break;
            
        case Game.PLAYING:
            drawGame();
            break;

        case Game.GAMEOVER:
            drawGameOver()
            break;

        case Game.CONTROLS:
            drawControls();
            break;

        case Game.HISTORY:
            drawHistory();
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

function drawMenu() {
        //Erases Screen
        globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
        globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
        //Draws Map (mainMenu)
        renderMap();
        
        renderSprites();
}

function drawHighScore() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    renderSprites();

            //Draw SortBy
            globals.ctxHUD.font = "10px Medieval Scroll of Wisdom";
            globals.ctxHUD.fillStyle = "orangered";
            globals.ctxHUD.fillText("SORT BY :", 5, 30);
    
            //Draw Show
            globals.ctxHUD.fillText("SHOW :", 100, 30);
    
            //Draw Date
            globals.ctxHUD.fillText("DATE :", 185, 30);

            //Draw Title
            globals.ctx.font = "30px Medieval Scroll of Wisdom";
            globals.ctx.fillStyle = "black";
            globals.ctx.fillText("LEADERBOARD", 155, 90);

            //Draw List
            globals.ctx.font = "15px Medieval Scroll of Wisdom";
            globals.ctx.fillText("RANK", 115, 130);
            globals.ctx.fillText("NAME", 235, 130);
            globals.ctx.fillText("SCORE", 355, 130);

            globals.ctx.font = "12px Medieval Scroll of Wisdom";
            globals.ctx.fillText("1", 135, 160);
            globals.ctx.fillText("AAA", 243, 160);
            globals.ctx.fillText("127574", 365, 160);

            globals.ctx.fillText("2", 135, 190);
            globals.ctx.fillText("URB", 243, 190);
            globals.ctx.fillText("113896", 365, 190);

            globals.ctx.fillText("3", 135, 220);
            globals.ctx.fillText("AFS", 243, 220);
            globals.ctx.fillText("105893", 365, 220);

            globals.ctx.fillText("4", 135, 250);
            globals.ctx.fillText("ZZZ", 243, 250);
            globals.ctx.fillText("102833", 365, 250);

            globals.ctx.fillText("5", 135, 280);
            globals.ctx.fillText("YRM", 243, 280);
            globals.ctx.fillText("98734", 365, 280);

            globals.ctx.fillText("6", 135, 310);
            globals.ctx.fillText("OCS", 243, 310);
            globals.ctx.fillText("79385", 365, 310);

            globals.ctx.fillText("7", 135, 340);
            globals.ctx.fillText("JGF", 243, 340);
            globals.ctx.fillText("50389", 365, 340);










}

function drawGameOver() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    

}

function drawControls() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    renderSprites();
}

function drawHistory() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    renderSprites();
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
    const tileSetColNum = 14;
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
