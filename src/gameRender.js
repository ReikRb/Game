import globals from "./globals.js"
import {Game, ParticleID, ParticleState, ScoreWheel} from "./constants.js"
import { Tile } from "./constants.js";
import { levels } from "./Level.js";
//Graphic Renderer Method
export default function render(){

    //Modifies Game Depending On Game State
    switch(globals.gameState){
        case Game.LOADING:
            drawLoading()
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

        case Game.WIN:
            drawWin();
            break;

        case Game.GAMEOVER:
            drawGameOver();
            break;
        
        case Game.OVER_SCORE:
            drawOverScore();
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

    // //Camera movement
    moveCamera()

    // //Draws FPS in Screen
    // globals.ctx.fillText("FPS: " + (1 / globals.deltaTime), 30, 30)

    //Draws Map (Level)
    renderMap();

    renderParticles()

    // //Draw Elements
    renderSprites();

    
    // //Restore Camera
    restoreCamera()

    //Draw HUD
    renderHUD();

    // globals.ctx.fillText(globals.innerTime.value, 20, 30)

}

function drawMenu() {
        //Erases Screen
        globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
        globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
        //Draws Map (mainMenu)
        renderMap();     
        renderSprites();
        renderParticles()

            //Draw Title
    globals.ctxHUD.font = "12px Medieval Scroll of Wisdom";
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText("Wound Valley's Inn Journey", 28, 30);

            //Draw Return Button
    globals.ctx.font = "25px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "white";

    globals.ctx.fillText("> ", 140, (globals.position*40))
    globals.ctx.fillText("NEW GAME", 190, 40);

    globals.ctx.fillText("STORY", 190, 80);

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
            globals.ctxHUD.fillText("THE DECREPYT THRONE :", 55, 30);
    

            //Draw Return Button
            globals.ctx.font = "15px Medieval Scroll of Wisdom";
            globals.ctx.fillStyle = "black";
            globals.ctx.fillText("X TO BACK", 15, 20);

            //Draw Title
            globals.ctx.font = "30px Medieval Scroll of Wisdom";
            globals.ctx.fillStyle = "black";
            globals.ctx.fillText("LEADERBOARD", 155, 50);

            //Draw List
            globals.ctx.font = "15px Medieval Scroll of Wisdom";
            globals.ctx.fillText("RANK", 115, 80);
            globals.ctx.fillText("NAME", 235, 80);
            globals.ctx.fillText("SCORE", 355, 80);

            globals.ctx.font = "12px Medieval Scroll of Wisdom";
            for (let i = (globals.highScorePage*10); i < (globals.highScorePage*10+10); i++) {
                const highScore = globals.highScores[i];
                if (highScore) {
                    globals.ctx.fillText(i+1, -15+globals.leftText, 100 + (i-(globals.highScorePage*10))*30);
                    globals.ctx.fillText(highScore.name, 243, 500-globals.midText + (i-(globals.highScorePage*10))*30);
                    globals.ctx.fillText(highScore.score, 600-globals.rightText, 100 + (i-(globals.highScorePage*10))*30);   
                }
                
            }

}

function drawGameOver() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    //Draw Return Button
    document.getElementById("gameScreen").style.backgroundColor = "black"
    globals.ctxHUD.font = "30px Medieval Scroll of Wisdom";
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText("GAME OVER", 18, 44);

    globals.ctx.font = "20px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "white";
    if (globals.currentLevel < levels.length) {

        if (globals.score === globals.highScore) {
            globals.ctx.fillText("¡¡NEW RECORD!!", 180, 50);
        }
        globals.ctx.fillText("YOUR SCORE", 50, 100);
        globals.ctx.fillText("" +   ScoreWheel[globals.scoreWheelValues[0]]+
                                    ScoreWheel[globals.scoreWheelValues[1]]+
                                    ScoreWheel[globals.scoreWheelValues[2]], 230, 100)
        globals.ctx.fillText("_", 235+(globals.position-1)*20, 102);
        globals.ctx.fillText(globals.score, 380, 100);



        globals.ctx.fillText("Enter to Continue", 20,360)
    } else {
        globals.ctx.fillText("YOU MANAGED TO REACH TO THE INN", 58, 64);
        globals.ctx.fillText("CONGRATULATIONS ! !", 158, 120);
        globals.ctx.fillText("Enter to Continue", 360,360)

        globals.ctx.fillText("YOUR SCORE", 100, 175);
        globals.ctx.fillText("" +   ScoreWheel[globals.scoreWheelValues[0]]+
                                    ScoreWheel[globals.scoreWheelValues[1]]+
                                    ScoreWheel[globals.scoreWheelValues[2]], 280, 175)
        globals.ctx.fillText("_", 285+(globals.position-1)*20, 177);
        globals.ctx.fillText(globals.score, 430, 175);
    }

    const sprite = globals.sprites[0]
    renderSpriteScaled(sprite)
}

function drawOverScore() {
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    globals.ctxHUD.fillText("HIGHSCORES", 18, 44);
    for (let i = (-2+globals.posCorrection); i < (3+globals.posCorrection); i++) {
        const highScore = globals.highScores[globals.scorePos+i];
        if (i === 0) {
            globals.ctx.fillStyle = "red";
        }
        globals.ctx.fillText(globals.scorePos+i+1, 50, 150+i*25);
        globals.ctx.fillText(highScore.name, 230, 150+i*25)
        globals.ctx.fillText(highScore.score, 420, 150+i*25);
        globals.ctx.fillStyle = "white";
    }
    
    globals.ctx.fillText("Enter to HighScore", 180,360)
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
    globals.ctx.fillText("X TO BACK", 15, 20);

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
    globals.ctx.fillText(`CONFIRM`, 150, 320)
    globals.ctx.fillText(`>`, 260, 320)
    globals.ctx.fillText(`ENTER`, 330, 320)
}

function drawHistory() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    renderSprites();

    //Draw Title
    globals.ctxHUD.font = "16px Medieval Scroll of Wisdom";
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText("Chapter 3", 78, 30);

    //Draw Return Button
    globals.ctx.font = "15px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "black";
    globals.ctx.fillText("X TO BACK", 15, 20);

    //Draw History
    globals.ctx.font = "10px Medieval Scroll of Wisdom";

    for (let i = 0; i < globals.lines.length; i++) {
        const line = globals.lines[i];
        globals.ctx.fillText(line.typing, line.xPos, line.yPos)
    }

}

function drawLoading() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    //Draw Return Button
    document.getElementById("gameScreen").style.backgroundColor = "black"
    globals.ctx.font = "30px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("The Decrepyt Throne:", 88, 44);

    globals.ctx.font = "16px Medieval Scroll of Wisdom";
    globals.ctx.fillText("Wound Valley's Inn Journey", 158, 94);

    globals.ctx.fillText("    _______________________________________________________  ", 0, 0);
    globals.ctx.fillText(`  /    |                                                                                 |.`, 0, 14);
    globals.ctx.fillText("  |    |                                                                                 |.", 0, 24);
    globals.ctx.fillText("   |___|                                                                                 |.", 0, 34);
    globals.ctx.fillText("       |                                                                                 |.", 0, 44);
    globals.ctx.fillText("       |                                                                                 |.", 0, 54);
    globals.ctx.fillText("       |                                                                                 |.", 0, 64);
    globals.ctx.fillText("       |                                                                                 |.", 0, 74);
    globals.ctx.fillText("       |                                                                                 |.", 0, 84);
    globals.ctx.fillText("       |                                                                                 |.", 0, 94);
    globals.ctx.fillText("       |                                                                                 |.", 0, 104);
    globals.ctx.fillText("       |                                                                                 |.", 0, 114);
    globals.ctx.fillText("       |                                                                                 |.", 0, 124);
    globals.ctx.fillText("       |                                                                                 |.", 0, 134);
    globals.ctx.fillText("       |                                                                                 |.", 0, 144);
    globals.ctx.fillText("       |                                                                                 |.", 0, 154);
    globals.ctx.fillText("       |                                                                                 |.", 0, 164);
    globals.ctx.fillText("       |                                                                                 |.", 0, 174);
    globals.ctx.fillText("       |                                                                                 |.", 0, 184);
    globals.ctx.fillText("       |                                                                                 |.", 0, 194);
    globals.ctx.fillText("       |                                                                                 |.", 0, 204);
    globals.ctx.fillText("       |                                                                                 |.", 0, 214);
    globals.ctx.fillText("       |                                                                                 |.", 0, 224);
    globals.ctx.fillText("       |                                                                                 |.", 0, 234);
    globals.ctx.fillText("       |                                                                                 |.", 0, 244);
    globals.ctx.fillText("       |                                                                                 |.", 0, 254);
    globals.ctx.fillText("       |                                                                                 |.", 0, 264);
    globals.ctx.fillText("       |                                                                                 |.", 0, 274);
    globals.ctx.fillText("       |                                                                                 |.", 0, 284);
    globals.ctx.fillText("       |                                                                                 |.", 0, 294);
    globals.ctx.fillText("       |                                                                                 |.", 0, 304);
    globals.ctx.fillText("       |   ____________________________________________________ ", 0, 314);
    globals.ctx.fillText("       |  /                                                                              /.", 0, 334);
    globals.ctx.fillText("       |_/____________________________________________________/.", 0, 354);
    
    



    
     
    
    if (globals.assetsToLoad.length != globals.assetsLoaded) {
        globals.ctx.fillText("Casting the  required Spells ", 160,200)
        globals.ctx.fillText("to initialize the game ", 193,225)

        globals.ctx.fillRect(85,324,450*(globals.assetsLoaded/globals.assetsToLoad.length), 20)
        globals.ctx.fillStyle = "black";
        globals.ctx.fillText("LOADING", 270,342)
        globals.ctx.fillStyle = "white";
    } else {
        globals.ctx.fillRect(85,324,450*(globals.assetsLoaded/globals.assetsToLoad.length), 20)
        globals.ctx.fillText("Press Enter to Continue ", 193,225)
        globals.ctx.fillStyle = "black";
        globals.ctx.fillText("LOAD COMPLETE", 220,342)
        globals.ctx.fillStyle = "white";

    }
    

    // const sprite = globals.sprites[0]
    // renderSpriteScaled(sprite)
}

function drawWin() {
    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)
    
    //Draw Return Button
    document.getElementById("gameScreen").style.backgroundColor = "black"
    globals.ctxHUD.font = "25px Medieval Scroll of Wisdom";
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText("LEVEL CLEAR!", 18, 44);

    globals.ctx.font = "20px Medieval Scroll of Wisdom";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("YOUR SCORE", 108, 64);
    globals.ctx.fillText(globals.score, 400, 64)
    globals.ctx.fillText("TIME LEFT", 108, 120);
    globals.ctx.fillText(globals.levelTime.value + "  x  100", 400, 120)
    globals.ctx.fillText("TOTAL SCORE", 108, 180);
    globals.ctx.fillText(globals.score + (globals.levelTime.value * 100), 400, 180)
    globals.ctx.fillText("Z to Continue", 210,260)

    // const sprite = globals.sprites[0]
    // renderSpriteScaled(sprite)
}


function moveCamera(){
    // globals.ctx.translate(50, 50)
    const xTranslation = -globals.camera.x
    const yTranslation = -globals.camera.y

    globals.ctx.translate(xTranslation, yTranslation)
}
function restoreCamera() {
    globals.ctx.setTransform(1,0,0,1,0,0)
}

function renderHUD() {
    //Raw Data

    const time      = globals.levelTime.value;

    //Draw High Score
    globals.ctxHUD.fillStyle = "red";
    globals.ctxHUD.fillText("HIGHSCORE", 0, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText("" + globals.highScore, 0, 18);

    //Draw Score
    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "red";
    globals.ctxHUD.fillText("SCORE", 0, 31);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText("" + globals.score, 0, 41);

    // globals.ctxHUD.fillText(" " + globals.mana, 168, 16)
}

//Map Drawer Method
function renderMap() {
    const brickSize     = globals.level.imageSet.gridSize;
    const levelData     = globals.level.data;
    const tileSetColNum = 10;
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



function drawSpriteRectangle(sprite) {
    const x1 = Math.floor(sprite.xPos)
    const y1 = Math.floor(sprite.yPos)
    const w1 = sprite.imageSet.xSize
    const h1 = sprite.imageSet.ySize

    globals.ctx.fillStyle = "green"
    globals.ctx.fillRect(x1, y1, w1, h1)
}

function drawHitBox(sprite){
//Sprite DATA
if (sprite.hitBox) {
    
    const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset)
    const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset)
    const w1 = sprite.hitBox.xSize
    const h1 = sprite.hitBox.ySize
    globals.ctx.strokeStyle = "red";
    globals.ctx.strokeRect(x1,y1,w1,h1)
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

function renderSpriteScaled(sprite) {

    //Sets initial tile position
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    //Sets tilemap drawing position
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset

    // Sprites position rounded down
    const xPos = Math.floor(sprite.xPos)
    const yPos = Math.floor(sprite.yPos)

    //Center of Sprite
    globals.ctx.translate((xPos + sprite.imageSet.xSize / 2),  (yPos + sprite.imageSet.ySize / 2))

    globals.ctx.scale(2.5,2.5)

    globals.ctx.translate(-(xPos + sprite.imageSet.xSize / 2), - (yPos + sprite.imageSet.ySize / 2))

    

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
    globals.ctx.setTransform(1, 0, 0, 1, 0, 0)
    
}

function renderParticles() {
    for (let i = 0; i < globals.particles.length; i++) {
        const particle = globals.particles[i];
        renderParticle(particle)    
    }
}

function renderParticle(particle) {
    const type = particle.id
    switch (type) {

        case ParticleID.EXPLOSION:
            renderExplosionParticle(particle)
            break;

        case ParticleID.FIRE:
            renderFireParticle(particle)
            break;

        case ParticleID.GRAVITYEXPLOSION:
            renderGravityParticle(particle)
            break;

        case ParticleID.BUBBLE:
            renderBubbleParticle(particle)
            break;

        case ParticleID.STAR:
            renderStarParticle(particle)
            break;

        case ParticleID.MENUPARTICLE:
            renderMenuParticle(particle)
            break;

    }
}

function renderExplosionParticle(particle) {
    if (particle.state != ParticleState.OFF) {
        globals.ctx.fillStyle = particle.colour
        globals.ctx.globalAlpha = particle.alpha
        globals.ctx.beginPath()
        //Creates curve: (    xPos   ,      yPos    ,   arc radius   , sAngle,    eAngle   ) OPTIONAL: boolean for counterclock = TRUE
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius,      0,  2 * Math.PI)
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0
    }
}

function renderFireParticle(particle) {
    if (particle.state != ParticleState.OFF) {
        globals.ctx.save()
        globals.ctx.fillStyle   = "white"
        globals.ctx.filter      = "blur(2px) saturate(500%)"

        globals.ctx.globalsAlpha = particle.alpha
        globals.ctx.beginPath()
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI)

        globals.ctx.fill()
        globals.ctx.restore()
    }
}

function renderGravityParticle(particle) {
    if (particle.state != ParticleState.OFF) {
        globals.ctx.fillStyle = particle.colour
        globals.ctx.globalAlpha = particle.alpha
        globals.ctx.beginPath()
        //Creates curve: (    xPos   ,      yPos    ,   arc radius   , sAngle,    eAngle   ) OPTIONAL: boolean for counterclock = TRUE
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius,      0,  2 * Math.PI)
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0
    }
}

function renderBubbleParticle(particle) {
    if (particle.state != ParticleState.OFF) {
        globals.ctx.fillStyle = particle.colour
        globals.ctx.globalAlpha = particle.alpha
        globals.ctx.beginPath()
        //Creates curve: (    xPos   ,      yPos    ,   arc radius   , sAngle,    eAngle   ) OPTIONAL: boolean for counterclock = TRUE
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius,      200,  2 * Math.PI)
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0
    }
}

function renderStarParticle(particle) {
    if (particle.state != ParticleState.OFF) {
        globals.ctx.fillStyle = particle.colour
        globals.ctx.globalAlpha = particle.alpha
        globals.ctx.beginPath()
        //Creates curve: (    xPos   ,      yPos    ,   arc radius   , sAngle,    eAngle   ) OPTIONAL: boolean for counterclock = TRUE
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius,     200,  2 * Math.PI)
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0
    }
}

function renderMenuParticle(particle) {
    if (particle.state != ParticleState.OFF) {
        globals.ctx.fillStyle = particle.colour
        globals.ctx.globalAlpha = particle.alpha
        globals.ctx.beginPath()
        //Creates curve: (    xPos   ,      yPos    ,   arc radius   , sAngle,    eAngle   ) OPTIONAL: boolean for counterclock = TRUE
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius,     0,  2 * Math.PI)
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0
    }
}