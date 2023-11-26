import globals from "./globals.js"
import {Game, FPS, SpriteId, State} from "./constants.js"
import Sprite from "./Sprite.js"
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";

//Inits HTML elements Method
function initHTMLelements(){
    //Canvas
    globals.canvas = document.getElementById('gameScreen');

    //Context
    globals.ctx = globals.canvas.getContext('2d');

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
    //Assign value to global's tileSet
    globals.tileSet = new Image();
    globals.tileSet.addEventListener("load", loadHandler, false);
    globals.tileSet.src = "./images/Run.png";

    //Adds the Loaded tileSet to the Array
    globals.assetsToLoad.push(globals.tileSets)
}

function loadHandler() {

    globals.assetsLoaded++; //Adds 1 to the counter

    //Once all Elements are loaded
    if (globals.assetsLoaded === globals.assetsToLoad.length) {
        
        //Removes Load Event Listener
        globals.tileSet.removeEventListener("load", loadHandler, false)

        console.log("Assets loaded")

        //Starts Game
        globals.gameState = Game.PLAYING;
    }
}

function initSprites() {
    initPlayer();
}

function initPlayer(){
    //Img Properties:           xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(77,    79,     77,      73,      62)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8)

    //Sprite Creation
    const player = new Sprite(SpriteId.PLAYER, State.UP, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(player)
}

export {initHTMLelements, initVars, loadAssets, initSprites}