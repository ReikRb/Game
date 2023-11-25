import globals from "./globals.js"
import {Game, FPS} from "./constants.js"

//Inits HTML elements Method
function initHTMLelements(){
    //Canvas
    globals.canvas = document.getElementById("gameScreen");

    //Context
    globals.ctx = globals.canvas.getContext("2d");

    //Anti-Aliasing Removal
    globals.ctx.imageSmoothingEnabled = false;

    //Debugger Text Box
    globals.txtPruebas = document.getElementById("txtPruebas");
    
}