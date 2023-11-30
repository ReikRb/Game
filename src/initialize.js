import globals from "./globals.js"
import {Game, FPS, SpriteId, State} from "./constants.js"
import Sprite from "./Sprite.js"
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1 } from "./Level.js";

//Inits HTML elements Method
function initHTMLelements(){
    //Canvas
    globals.canvas = document.getElementById('gameScreen');

    //Context
    globals.ctx = globals.canvas.getContext('2d');

    //Canvas HUD
    globals.canvasHUD = document.getElementById('gameHUD');

    //Context HUD
    globals.ctxHUD = globals.canvasHUD.getContext('2d');

    //Anti-Aliasing Removal
    globals.ctx.imageSmoothingEnabled = false;

    //Debugger Text Box
    globals.txtPruebas = document.getElementById('txtPruebas');

}

//Inits Game Variables Method
function initVars() {
    
    //Inits Game Time Management Variables
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;

    //Inits Game State
    globals.gameState = Game.LOADING;
}

function loadAssets(){
    let tileSet;
    
    //Loads SpriteSheet Img
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/SpriteSheet.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);


    //Loads Blocks Img
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/blocks.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet)

}

function loadHandler() {

    globals.assetsLoaded++; //Adds 1 to the counter

    //Once all Elements are loaded
    if (globals.assetsLoaded === globals.assetsToLoad.length) {
        
        //Removes Load Event Listener
        for (let i = 0; i < globals.tileSets.length; i++) {
            globals.tileSets[i].removeEventListener("load", loadHandler, false)
              
        }

        console.log("Assets loaded")

        //Starts Game
        globals.gameState = Game.PLAYING;
    }
}

function initSprites() {

    initEmptyCrystalLife();
    initLife();
    initEmptyCrystalMana();
    initMana();
    initEmptyPower();
    initPower();
    initEmptyKey();
    // initObtainedKey();
    initCheckPoint();
    initKey();
    initPlayer();
    initChair();
    initSkeleton();
}


function initPlayer(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0,       0,      140,    110,     140,     10,      40)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8)

    //Sprite Creation
    const player = new Sprite(SpriteId.PLAYER, State.IDLE, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(player)
}

function initChair() {

    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(6,       4,      140,    110,     140,     10,      40)
    
    //Animation Data (8 Frames / State)
    const frames = new Frames (2)

    //Sprite Creation
    const chair = new Sprite(SpriteId.CHAIR, State.IDLE, 100, 70, imageSet, frames)

        //Adds Sprite to Array
        globals.sprites.push(chair)
}

//TERMINAR DE REVISAR LAS ANIMACIONES
function initSkeleton(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(14,       0,      100,    90,     140,      20,      60)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8)

    //Sprite Creation
    const skeleton = new Sprite(SpriteId.SKELETON, State.IDLE_2, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(skeleton)
}

function initKey(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(22,       0,      30,    35,     140,      60,      43)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8)

    //Sprite Creation
    const key = new Sprite(SpriteId.KEY, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(key)
}

function initCheckPoint(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(16,       2,      35,    45,     140,     64,      110)

    //Animation Data (8 Frames / State)
    const frames = new Frames (5)

    //Sprite Creation
    const checkpoint = new Sprite(SpriteId.CHECKPOINT, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(checkpoint)
    
}
function initEmptyCrystalLife(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       4,      28,    51,     140,      70,      88)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Sprite Creation
    const EmptyCrystalLife = new Sprite(SpriteId.EMPTY_CRYSTAL_LIFE, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(EmptyCrystalLife)
    globals.SpritesHUD++

}

function initLife(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       6,      28,    51,     140,     70,      108)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Sprite Creation
    const life = new Sprite(SpriteId.LIFE, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(life)
    globals.SpritesHUD++
}

function initEmptyCrystalMana(){
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(9,       4,      28,    51,     140,      70,      88)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1)
    
        //Sprite Creation
        const EmptyCrystalMana = new Sprite(SpriteId.EMPTY_CRYSTAL_MANA, State.IDLE_3, 100, 70, imageSet, frames)
    
        //Adds Sprite to Array
        globals.sprites.push(EmptyCrystalMana)
        globals.SpritesHUD++

}

function initMana(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       5,      28,    51,     140,     70,      108)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Sprite Creation
    const mana = new Sprite(SpriteId.MANA, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(mana)
    globals.SpritesHUD++
}

function initEmptyPower(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       4,      50,    50,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Sprite Creation
    const emptyPower = new Sprite(SpriteId.EMPTY_POWER, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(emptyPower)
    globals.SpritesHUD++
    
}

function initPower(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       5,      50,    50,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Sprite Creation
    const power = new Sprite(SpriteId.POWER, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(power)
    globals.SpritesHUD++
    
}

function initEmptyKey(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       6,      60,    45,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Sprite Creation
    const emptyKey = new Sprite(SpriteId.EMPTY_KEY, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(emptyKey)
    globals.SpritesHUD++
    
}

function initObtainedKey(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       7,      60,    45,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Sprite Creation
    const obtainedKey = new Sprite(SpriteId.OBTAINED_KEY, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(obtainedKey)
    globals.SpritesHUD++
    
}




function initLevel() {
    
    //Makes Properties of Map Img: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(    0,       0,      32,    32,      32,      0,      0)

    //Makes & Saves Level
    globals.level = new Level(level1, imageSet)
}  


export {initHTMLelements, initVars, loadAssets, initSprites, initLevel} 