import globals from "./globals.js"
import {Game, FPS} from "./constants.js"

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

export {initHTMLelements, initVars}