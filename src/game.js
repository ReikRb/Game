// Main Structure: Init. y exe.


import globals from "./globals.js";
import { initHTMLelements, initVars, loadAssets, initSprites, initLevel } from "./initialize.js";
import update from "./gameLogic.js"
import render from "./gameRender.js"


/////////////////////////// GAME INIT //////////////////////////

window.onload = init;

function init() {

    //Inits HTML elements: Canvas, Context & Debugger Text Box
    initHTMLelements();

    //Loads all archives
    loadAssets();

    //Inits Sprites
    initSprites();

    //Inits game variables
    initVars();

    //Inits Game Map
    initLevel();

    //First Frame Request
    window.requestAnimationFrame(gameLoop);
}


/////////////////////////// GAME EXECUTE //////////////////////////

//Main Loop
function gameLoop(timeStamp) {
    //Constantly request new frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    //Real Time Loop Execution
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000; //seconds

    //Last Executed Loop Time
    globals.previousCycleMilliseconds = timeStamp;


    //Fixes delayed Frame Time regarding frameTimeObj
    globals.deltaTime += elapsedCycleSeconds

    if (globals.deltaTime >= globals.frameTimeObj) {

        //Updates gameLogic.js
        update();

        //Draws gameRender.js
        render();

        //Fixes Excesive Time
        globals.deltaTime -= globals.frameTimeObj;

    }
    }

