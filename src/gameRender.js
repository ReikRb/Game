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
    globals.ctxHUD.fillText("The decrepit Throne", 78, 30);

            //Draw Return Button
    globals.ctx.font = "25px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("> NEW GAME", 210, 40);

    globals.ctx.fillText("HISTORY", 210, 80);

    globals.ctx.fillText("CONTROLS", 210, 120);

    globals.ctx.fillText("LEADERBOARD", 210, 160);
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
    globals.ctxHUD.fillText("Chapter 3: To the Twilight Inn", 58, 30);

    //Draw Return Button
    globals.ctx.font = "15px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "black";
    globals.ctx.fillText("GO BACK", 30, 40);

    //Draw History
    globals.ctx.font = "10px Medieval Scroll of Wisdom";
    globals.ctx.fillText(`With the chair restored and its magic renewed, Joseph was granted with the power of the chair on a magical`, 70, 80)
    globals.ctx.fillText(`staff and a spellbook. He then decided to embark towards the Twilight Inn, a magical refuge where`, 70, 90)
    globals.ctx.fillText(`he hoped to find a new purpose for his life torn apart by madness and obsession.`, 70, 100)
    globals.ctx.fillText(`Without the company of the villagers, who still held their distrust towards him, Joseph ventured alone,`, 70, 110)
    globals.ctx.fillText(`guiding the chair in a magic bubble so he didn't have to carry it through the Lowlands.`, 70, 120)

    globals.ctx.fillText(`The journey was an odyssey in itself. Joseph had to navigate dark forests, always with the chair by his side,`, 70, 140)
    globals.ctx.fillText(`glowing with a magical radiance that left traces along the way. During his traverse, Joseph encountered`, 70, 150)
    globals.ctx.fillText(`mystical creatures & bandits drawn by the chair's energy, testing him. He faced challenges of cunning and magic,`, 70, 160)
    globals.ctx.fillText(`proving that the chair, despite its dark past, could also be a symbol of protection.`, 70, 170)

    globals.ctx.fillText(`On a stormy night, Joseph sought refuge in a cave, shielding the chair from nature's fury.`, 70, 190)
    globals.ctx.fillText(`While resting, he dreamt of visions from the past, revelations about the true nature of the chair, `, 70, 200)
    globals.ctx.fillText(`and his own internal struggles. The chair's magic, though restored, still toyed with his sanity,`, 70, 210)
    globals.ctx.fillText(`but Joseph was determined to find redemption at the Twilight Inn.`, 70, 220)

    globals.ctx.fillText(`The journey continued through endless plains and challenging mountains. `, 70, 240)
    globals.ctx.fillText(`Joseph, with the chair as his sole companion, rediscovered the inner strength he had lost in his`, 70, 250)
    globals.ctx.fillText(`previous madness. The chair, now more than a mere object, became an ally in his journey of self-affirmation.`, 70, 260)

    globals.ctx.fillText(`Finally, after days of travel, Joseph arrived at the last challenge he had to face, the catacombs. `, 70, 280)
    globals.ctx.fillText(`Horrible things awaited him if he wanted to achieve his destiny.  The Twilight Inn.`, 70, 290)

    globals.ctx.fillText(`Horrible creatures, bandits (which were looting the corpses left behind) & and the catacomb itself`, 70, 310)
    globals.ctx.fillText(` which had really difficult trials to keep away the humans of the resting souls.`, 70, 320) 
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
