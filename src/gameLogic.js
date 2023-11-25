import globals from "./globals.js"
import {Game} from "./constants.js"

export default function update(){

    //Modifies Game Depending On Game State
    switch(globals.gameState){
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.PLAYING:
            playGame();
            break;
        
        default:
            console.error("Error: Game State invalid")

    }

    function playGame() {
        
        //TO DO
    }
}