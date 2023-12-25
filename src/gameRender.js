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

            //Draw Title
    globals.ctxHUD.font = "12px Medieval Scroll of Wisdom";
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText("The decrepit Throne", 52, 30);

            //Draw Return Button
    globals.ctx.font = "25px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("> NEW GAME", 190, 40);

    globals.ctx.fillText("HISTORY", 190, 80);

    globals.ctx.fillText("CONTROLS", 190, 120);

    globals.ctx.fillText("LEADERBOARD", 190, 160);
}

function drawHighScore() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    renderSprites();

            //Draw SortBy
            globals.ctxHUD.font = "10px Medieval Scroll of Wisdom";
            globals.ctxHUD.fillStyle = "white";
            globals.ctxHUD.fillText("SORT BY :", 5, 30);
    
            //Draw Show
            globals.ctxHUD.fillText("SHOW :", 100, 30);
    
            //Draw Date
            globals.ctxHUD.fillText("DATE :", 185, 30);

            //Draw Return Button
            globals.ctx.font = "15px Medieval Scroll of Wisdom";
            globals.ctx.fillStyle = "black";
            globals.ctx.fillText("GO BACK", 30, 40);

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
    
    //Draw Return Button
    document.getElementById("gameScreen").style.backgroundColor = "black"
    globals.ctx.font = "30px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("GAME OVER", 188, 194);

}

function drawControls() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    renderSprites();  

    //Draw Title
    globals.ctxHUD.font = "12px Medieval Scroll of Wisdom";
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText("The Decrepit Throne", 78, 30);


    //Draw Title
    globals.ctx.font = "30px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "black";
    globals.ctx.fillText("CONTROLS", 195, 90);
    //Draw Return Button
    globals.ctx.font = "15px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "black";
    globals.ctx.fillText("GO BACK", 30, 40);

    //Draw History
    globals.ctx.font = "15px Medieval Scroll of Wisdom";
    globals.ctx.fillText(`LEFT`, 150, 120)
    globals.ctx.fillText(`>`, 260, 120)
    globals.ctx.fillText(`LEFT ARROW`, 330, 120)
    globals.ctx.fillText(`RIGHT`, 150, 160)
    globals.ctx.fillText(`>`, 260, 160)
    globals.ctx.fillText(`RIGHT ARROW`, 330, 160)
    globals.ctx.fillText(`JUMP`, 150, 200)
    globals.ctx.fillText(`>`, 260, 200)
    globals.ctx.fillText(`SPACEBAR`, 330, 200)
    globals.ctx.fillText(`FIRE`, 150, 240)
    globals.ctx.fillText(`>`, 260, 240)
    globals.ctx.fillText(`Z`, 330, 240)
    globals.ctx.fillText(`RETURN`, 150, 280)
    globals.ctx.fillText(`>`, 260, 280)
    globals.ctx.fillText(`X`, 330, 280)
}

function drawHistory() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    renderSprites();

    //Draw Title
    globals.ctxHUD.font = "12px Medieval Scroll of Wisdom";
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText("Chapter 3: To the Twilight Inn", 28, 30);

    //Draw Return Button
    globals.ctx.font = "15px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "black";
    globals.ctx.fillText("GO BACK", 30, 40);

    //Draw History
    globals.ctx.font = "10px Medieval Scroll of Wisdom";
    globals.ctx.fillText(`With the chair restored and its magic renewed, Joseph was granted, `, 70, 80)
    globals.ctx.fillText(`thanks to the chair, a magical staff and a spellbook. He then decided `, 70, 90)
    globals.ctx.fillText(`to embark towards the Twilight Inn, a magical refuge where he `, 70, 100)
    globals.ctx.fillText(`hoped to find a new purpose for his life torn apart by madness and `, 70, 110)
    globals.ctx.fillText(`obsession. Without the company of the villagers, who still held their `, 70, 120)
    globals.ctx.fillText(`distrust towards him, Joseph ventured alone, guiding the chair in `, 70, 130)
    globals.ctx.fillText(`a magic bubble so he didn't have to carry it through the Lowlands.`, 70, 140)

    globals.ctx.fillText(`On a stormy night, he dreamt of visions from the past, revealing the true `, 70, 160)
    globals.ctx.fillText(`nature of the chair, and his own internal struggles. The chair's magic, `, 70, 170)
    globals.ctx.fillText(`though restored, still toyed with his sanity, but Joseph was determined.`, 70, 180)

    globals.ctx.fillText(`The journey continued through endless challenges. Joseph, with the`, 70, 200)
    globals.ctx.fillText(`chair as his sole companion, rediscovered the inner strength he had `, 70, 210)
    globals.ctx.fillText(`lost in his previous madness. The chair, now more than a mere object,`, 70, 220)
    globals.ctx.fillText(`became an ally in his journey of self-affirmation.`, 70, 230)
    
    globals.ctx.fillText(`Finally, after days of travel, Joseph arrived at the last challenge `, 70, 250)
    globals.ctx.fillText(`he had to face, the catacombs. Horrible things awaited him if he `, 70, 260)
    globals.ctx.fillText(`wanted to achieve his destiny. Horrible creatures, bandits and the `, 70, 270)
    globals.ctx.fillText(`catacomb itself which had really difficult trials to keep away`, 70, 280) 
    globals.ctx.fillText(`the humans of the resting souls.`, 70, 290)
}


function renderHUD() {
    //Raw Data
    const score     = 1154700;
    const highScore = 1200000;
    const time      = globals.levelTime.value;

    //Draw High Score
    globals.ctxHUD.fillStyle = "red";
    globals.ctxHUD.fillText("HIGHSCORE", 0, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText("" + highScore, 0, 18);

    //Draw Score
    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "red";
    globals.ctxHUD.fillText("SCORE", 0, 31);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText("" + score, 0, 41);

    globals.ctxHUD.fillText(" " + globals.mana, 168, 16)
    


    renderSprites()
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
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        // drawSpriteRectangle(sprite)
        // drawHitBox(sprite)
        renderSprite(sprite)
    }
}



// function drawSpriteRectangle(sprite) {
//     const x1 = Math.floor(sprite.xPos)
//     const y1 = Math.floor(sprite.yPos)
//     const w1 = sprite.imageSet.xSize
//     const h1 = sprite.imageSet.ySize

//     globals.ctx.fillStyle = "green"
//     globals.ctx.fillRect(x1, y1, w1, h1)
// }

function drawHitBox(sprite){
//Sprite DATA
const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset)
const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset)
const w1 = sprite.hitBox.xSize
const h1 = sprite.hitBox.ySize
globals.ctx.strokeStyle = "red";
globals.ctx.strokeRect(x1,y1,w1,h1)
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

    //Sets where to draw the actual sprite
    let isHUD = !sprite.HUD ? globals.ctx : globals.ctxHUD

    //Draws new frame on proper position
    isHUD.drawImage(
        globals.tileSets[Tile.SIZE_64],                 //Img File
        xTile, yTile,                                   //X & Y Position Source
        sprite.imageSet.xSize, sprite.imageSet.ySize,   //Height & Width Source
        xPos, yPos,                                     //Final X & Y Position
        sprite.imageSet.xSize, sprite.imageSet.ySize    //Final Height & Width
    )
}

