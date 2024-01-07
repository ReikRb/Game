import globals from "./globals.js"
import {Game} from "./constants.js"
import { initMainMenuMap, initMainMenuSprites, initSprites, initLevel, initParchmentBackground, initPower} from "./initialize.js";
import detectCollisions from "./collisions.js";

export default function update(){

    //Modifies Game Depending On Game State
    switch(globals.gameState){
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.LOAD_MAIN_MENU:
            globals.sprites = []
            initMainMenuMap()
            initMainMenuSprites()
            globals.gameState = Game.MAIN_MENU
            break;

        case Game.MAIN_MENU:
            updateSprites()
            break;
        
        case Game.LOAD_LEVEL:
            globals.sprites = []
            initLevel()
            initSprites()
            globals.gameState = Game.PLAYING
            break;

        case Game.PLAYING:
            playGame();
            break;
        
        case Game.HIGHSCORE:
            globals.sprites = []
            initParchmentBackground();
            break;

        case Game.GAMEOVER:
            globals.sprites = []
            break;

        case Game.CONTROLS:
            globals.sprites = []
            initParchmentBackground();
            break;

        case Game.HISTORY:
            globals.sprites = []
            initParchmentBackground();
            break;
            
        default:
            console.error("Error: Game State invalid")

    }

}

function playGame() {
    updateSprites();
    detectCollisions();
    updateCamera()
    updateLevelTime();
    updateMana()
    updateLife()
    updatePower()
}

function updateLevelTime() {
    //Adds the value modifier counter
    globals.levelTime.timeChangeCounter += globals.deltaTime;

    //Once enough time has passed, modifies the timer value
    if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue) {
        globals.levelTime.value--;

        //Then resets the timeChangeCounter
        globals.levelTime.timeChangeCounter = 0;
    }
}
function updateCamera() {
    const player = globals.sprites[0]
    globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width)/2)
    globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.ySize - globals.canvas.height)/2)

}
function updateSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        sprite.update()
        
    }
}
function updatePower() {

    if (globals.powerPreviousState && !globals.power) {
        initPower(globals.powerX, globals.powerY)
    }
    globals.powerPreviousState = globals.power
}
function updateLife(){
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        
        if (sprite.isCollidingWithPlayer && sprite.id === 1) {
            globals.life--
            if (globals.life < 0) {
                globals.life = 0
            }
        }
        if (globals.life >400) {
            globals.life = 400
        }

    }
}

function updateMana() {
    globals.mana = globals.levelTime.value
    if (globals.levelTime.value < 0) {
        globals.levelTime.value = 0
        globals.mana = 0
    }else if(globals.levelTime.value > 200){
        globals.levelTime.value = 200
        globals.mana = 200
    }
    if (globals.mana === 0) {
        globals.life--
    }
}