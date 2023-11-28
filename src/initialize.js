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
    initPlayer();
    initSkeleton();
}

function initPlayer(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0,       0,      80,    90,     90,      20,      10)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8)

    //Sprite Creation
    const player = new Sprite(SpriteId.PLAYER, State.IDLE, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(player)
}

function initSkeleton(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(5,       0,      80,    90,     90,      20,      10)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8)

    //Sprite Creation
    const skeleton = new Sprite(SpriteId.SKELETON, State.IDLE_2, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(skeleton)
}

function initLevel() {
    
    //Makes Properties of Map Img: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(    0,       0,      32,    32,      32,      0,      0)

    //Makes & Saves Level
    globals.level = new Level(level1, imageSet)
}   
export {initHTMLelements, initVars, loadAssets, initSprites, initLevel} 