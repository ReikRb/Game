import globals from "./globals.js"
import {Game} from "./constants.js"

//Graphic Renderer Method
export default function render(){

    //Modifies Game Depending On Game State
    switch(globals.gameState){
        case Game.LOADING:
            //Draws Loading
            break;
        
        case Game.PLAYING:
            drawGame();
            break;
        
        default:
            console.error("Error: Game State invalid")

    }
}

function drawGame(){

    //Erases Screen
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height)


    //Draws FPS in Screen
    globals.ctx.fillText("FPS: " + 1/globals.deltaTime, 30, 30)
}