import globals from "./globals.js"
import {Game, FPS, SpriteId, State} from "./constants.js"
import Sprite from "./Sprite.js"
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1, mainMenu } from "./Level.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";

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
function initTimers() {
    //Sets timer to 200 with changes/0,5s.
    globals.levelTime = new Timer(200, 0.5)
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
        globals.gameState = Game.LOAD_LEVEL;
    }
}

function initSprites() {

    initEmptyCrystalLife();
    initLife();
    initEmptyCrystalMana();
    initMana();
    initPowerHUD();
    initKeyHUD();
    initCheckPoint();
    initKey();
    initPlayer();
    initPlayerFireball();
    initPlayerAttackVFX();
    initChair();
    initSkeleton();
    
}

function initMainMenuSprites() {
    initPlayer();
    initPlayerFireball();
    initPlayerAttackVFX();
    initChair();
    initDummy()
}

function initParchmentBackground() {
    initParchment()
}

//Interface inits
function initEmptyCrystalLife(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       4,      28,    51,     140,      70,      88)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(40);
    //Sprite Creation
    const EmptyCrystalLife = new Sprite(SpriteId.EMPTY_CRYSTAL_LIFE, State.IDLE_3, 100, 70, imageSet, frames,physics)

    //Adds Sprite to Array
    globals.sprites.push(EmptyCrystalLife)
    globals.SpritesHUD++

}

function initLife(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       6,      28,    51,     140,     70,      108)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(40);

    //Sprite Creation
    const life = new Sprite(SpriteId.LIFE, State.IDLE_3, 100, 70, imageSet, frames, physics)

    //Adds Sprite to Array
    globals.sprites.push(life)
    globals.SpritesHUD++
}

function initEmptyCrystalMana(){
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(9,       4,      28,    51,     140,      70,      88)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1,2)
    
        //Creates Physic obj with vLimit 40
        const physics = new Physics(40);
    
        //Sprite Creation
        const EmptyCrystalMana = new Sprite(SpriteId.EMPTY_CRYSTAL_MANA, State.IDLE_3, 100, 70, imageSet, frames, physics)
    
        //Adds Sprite to Array
        globals.sprites.push(EmptyCrystalMana)
        globals.SpritesHUD++

}

function initMana(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       5,      28,    51,     140,     70,      108)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

        //Creates Physic obj with vLimit 40
        const physics = new Physics(40);

    //Sprite Creation
    const mana = new Sprite(SpriteId.MANA, State.IDLE_3, 100, 70, imageSet, frames, physics)

    //Adds Sprite to Array
    globals.sprites.push(mana)
    globals.SpritesHUD++
}


function initPowerHUD(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       4,      50,    50,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,6)

        //Creates Physic obj with vLimit 40
        const physics = new Physics(40);

    //Sprite Creation
    const powerHUD = new Sprite(SpriteId.POWERHUD, State.IDLE_3, 100, 70, imageSet, frames, physics)

    //Adds Sprite to Array
    globals.sprites.push(powerHUD)
    globals.SpritesHUD++
    
}

function initKeyHUD(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       6,      60,    45,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,1)

        //Creates Physic obj with vLimit 40
        const physics = new Physics(40);

    //Sprite Creation
    const keyHUD = new Sprite(SpriteId.KEYHUD, State.IDLE_3, 100, 70, imageSet, frames, physics)

    //Adds Sprite to Array
    globals.sprites.push(keyHUD)
    globals.SpritesHUD++
    
}


//In-Game inits
function initPlayer(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0,       0,      140,    110,     140,     10,      40)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8, 3)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(40);

    //Sprite Creation
    const player = new Sprite(SpriteId.PLAYER, State.IDLE, 20, 70, imageSet, frames, physics)

    //Adds Sprite to Array
    globals.sprites.push(player)
}

function initChair() {

    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(6,       4,      104,    75,     140,     10,      50)
    
    //Animation Data (8 Frames / State)
    const frames = new Frames (2,16)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(40);

    //Sprite Creation
    const chair = new Sprite(SpriteId.CHAIR, State.IDLE_3, 100, 70, imageSet, frames, physics)

    //Adds Sprite to Array
    globals.sprites.push(chair)
}

function initPlayerAttackVFX() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(25,       0,      90,    82,     140,     44,      40)
    
        //Animation Data (8 Frames / State)
        const frames = new Frames (8,3)

        //Creates Physic obj with vLimit 40
        const physics = new Physics(40);
    
        //Sprite Creation
        const attack = new Sprite(SpriteId.ATTACK_VFX, State.RIGHT, 100, 70, imageSet, frames, physics)
    
            //Adds Sprite to Array
            globals.sprites.push(attack)
}

function initPlayerFireball() {
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(6,       2,      80,    82,     140,     36,      40)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,6)

        //Creates Physic obj with vLimit 40
        const physics = new Physics(100);

    //Sprite Creation
    const fireball = new Sprite(SpriteId.FIREBALL, State.RIGHT, 100, 70, imageSet, frames,physics)

        //Adds Sprite to Array
        globals.sprites.push(fireball)
}


function initSkeleton(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(14,       0,      100,    90,     140,      20,      60)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8,6)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(40);

    //Sprite Creation
    const skeleton = new Sprite(SpriteId.SKELETON, State.IDLE_2, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(skeleton)
}

function initKey(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(22,       0,      30,    35,     140,      60,      43)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8,11)

        //Creates Physic obj with vLimit 40
        const physics = new Physics(40);

    //Sprite Creation
    const key = new Sprite(SpriteId.KEY, State.IDLE_3, 100, 70, imageSet, frames,physics)

    //Adds Sprite to Array
    globals.sprites.push(key)
}

function initCheckPoint(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(16,       2,      35,    45,     140,     64,      110)

    //Animation Data (8 Frames / State)
    const frames = new Frames (5,8)

        //Creates Physic obj with vLimit 40
    const physics = new Physics(40);

    //Sprite Creation
    const checkpoint = new Sprite(SpriteId.CHECKPOINT, State.IDLE_3, 100, 70, imageSet, frames, physics)

    //Adds Sprite to Array
    globals.sprites.push(checkpoint)
    
}
function initDoor(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(17,       2,      11,    96,     140,     68,      54)

    //Animation Data (8 Frames / State)
    const frames = new Frames (4)

    //Sprite Creation
    const door = new Sprite(SpriteId.DOOR, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(door)
    
}

function initParchment() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(19,       4,      576,    445,     140,     0,      45)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1)
    
        //Sprite Creation
        const parchment = new Sprite(SpriteId.PARCHMENT, State.IDLE_3, 0, 0, imageSet, frames)
    
        //Adds Sprite to Array
        globals.sprites.push(parchment)
}

function initPlatform() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(18,       4,      100,    9,     140,     32,      78)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1)
    
        //Sprite Creation
        const platform = new Sprite(SpriteId.PLATFORM, State.IDLE_3, 100, 70, imageSet, frames)
    
        //Adds Sprite to Array
        globals.sprites.push(platform)
}

function initDummy() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(23,       0,      67,    66,     140,     48,      81)

        //Animation Data (8 Frames / State)
        const frames = new Frames (8,8)

        //Creates Physic obj with vLimit 40
        const physics = new Physics(40);
    
        //Sprite Creation
        const dummy = new Sprite(SpriteId.DUMMY, State.IDLE, 100, 70, imageSet, frames, physics)
    
        //Adds Sprite to Array
        globals.sprites.push(dummy)
}


function initMainMenuMap() {
        //Makes Properties of Map Img: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(    0,       0,      32,    32,      32,      0,      0)

        //Makes & Saves Level
        globals.level = new Level(mainMenu, imageSet)
}

function initLevel() {
    
    //Makes Properties of Map Img: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(    0,       0,      32,    32,      32,      0,      0)

    //Makes & Saves Level
    globals.level = new Level(level1, imageSet)
}  


export {initHTMLelements, initVars, loadAssets, initSprites,initLevel, initMainMenuSprites, initMainMenuMap, initParchmentBackground, initTimers } 