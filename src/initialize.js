import globals from "./globals.js"
import {Game, FPS, SpriteId, State} from "./constants.js"
import Sprite from "./sprites/Sprite.js"
import { Player } from "./sprites/Player.js";
import { Skeleton } from "./sprites/Skeleton.js";
import { EmptyCrystal } from "./sprites/EmptyCrystal.js";
import { EmptyCrystal2 } from "./sprites/EmptyCrystal2.js";
import { Life } from "./sprites/Life.js";
import { Crystal } from "./sprites/Crystal.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1, mainMenu } from "./Level.js";
import Timer from "./Timer.js";
import Physics, { Eliptic, PlayerPhysics, UniformHorizontalMove } from "./Physics.js";
import { keydownHandler,keyupHandler } from "./events.js";
import { Mana } from "./sprites/Mana.js";
import { PowerHUD } from "./sprites/PowerHUD.js";
import { KeyHUD } from "./sprites/KeyHUD.js";
import { Chair } from "./sprites/Chair.js";
import { AttackVFX } from "./sprites/AttackVFX.js";
import { Fireball } from "./sprites/Fireball.js";
import { Key } from "./sprites/Key.js";
import { Checkpoint } from "./sprites/Checkpoint.js";
import { Door } from "./sprites/Door.js";
import { Parchment } from "./sprites/Parchment.js";
import { Platform } from "./sprites/Platform.js";
import { Dummy } from "./sprites/Dummy.js";
import HitBox  from "./HitBox.js";
import { Power } from "./sprites/Power.js";
import { JumpVFX } from "./sprites/JumpVFX.js";

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

    globals.action = {
        moveLeft:   false,
        moveRight:  false,
        fire:       false,
        jump:       false
    }
    
}

function initTimers() {
    //Sets timer to 200 with changes/0,5s.
    globals.levelTime = new Timer(200, 1)
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

function initEvents() {
    //Add the Keyboard event listeners
    window.addEventListener("keydown",  keydownHandler, false);
    window.addEventListener("keyup",    keyupHandler, false)
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
    initPlayer();
    initSkeleton();
    initEmptyCrystalLife();
    initLife();
    initEmptyCrystalMana();
    initMana();
    initPowerHUD();
    initKeyHUD();
    initCheckPoint();
    initKey();
    initChair();
    initPlatformVertical()
    initPlatform()
    initPower()
    initCrystal()
    initDoor()

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

    //Sprite Creation
    const EmptyCrystalLife = new EmptyCrystal(SpriteId.EMPTY_CRYSTAL_LIFE, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(EmptyCrystalLife)

}

function initLife(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       6,      28,    51,     140,     70,      108)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

    //Sprite Creation
    const life = new Life(SpriteId.LIFE, State.IDLE_3, 95, 80, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(life)
    globals.SpritesHUD++
}

function initEmptyCrystalMana(){
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(9,       4,      28,    51,     140,      70,      88)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1,2)


        //Sprite Creation
        const EmptyCrystalMana = new EmptyCrystal2(SpriteId.EMPTY_CRYSTAL_MANA, State.IDLE_3, 100, 70, imageSet, frames)

        //Adds Sprite to Array
        globals.sprites.push(EmptyCrystalMana)
        globals.SpritesHUD++

}

function initMana(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       5,      28,    51,     140,     70,      108)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

    //Sprite Creation
    const mana = new Mana(SpriteId.MANA, State.IDLE_3, 128, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(mana)
    globals.SpritesHUD++
}

function initCrystal(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       5,      28,    51,     140,     70,      88)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(70);
    const hitBox = new HitBox(30, 51, 0, 0)

    //Sprite Creation
    const mana = new Crystal(SpriteId.MANACRYSTAL, State.IDLE_3, 100, 70, imageSet, frames, physics, hitBox)

    mana.physics.vx = mana.physics.vLimit;
    mana.physics.vy = mana.physics.vLimit;

    //Adds Sprite to Array
    globals.sprites.push(mana)
}

function initPower(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       4,      50,    50,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,6)
    frames.frameCounter = 1
    const hitBox = new HitBox(38, 43, 10, 3)
    //Sprite Creation
    const power = new Power(SpriteId.POWER, State.IDLE_3, 100, 70, imageSet, frames, hitBox)
    
    //Adds Sprite to Array
    globals.sprites.push(power)
    

}
function initPowerHUD(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       4,      50,    50,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,6)

    //Sprite Creation
    const powerHUD = new PowerHUD(SpriteId.POWERHUD, State.IDLE_3, 209, 2, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(powerHUD)
    

}

function initKeyHUD(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       6,      60,    45,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,1)



    //Sprite Creation
    const keyHUD = new KeyHUD(SpriteId.KEYHUD, State.IDLE_3, 159, 2, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(keyHUD)
    

}

//In-Game inits
function initPlayer(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0,       0,      140,    110,     140,     10,      40)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8, 3)

    //Creates Physic obj with vLimit 40
    const physics = new PlayerPhysics(130, 130, 0.1, -450);

    const hitBox = new HitBox(43, 81, 50, 28)

    //Sprite Creation
    const player = new Player(SpriteId.PLAYER, State.IDLE_RIGHT, 0, 188, imageSet, frames, physics,hitBox)

    //Adds Sprite to Array
    globals.sprites.push(player)
}

function initChair() {

    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(6,       4,      104,    75,     140,     10,      50)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,16)

    //Sprite Creation
    const chair = new Chair(SpriteId.CHAIR, State.IDLE_3, 100, 70, imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(chair)
}

function initPlayerAttackVFX(xPos, yPos, STATE) {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(25,       0,      90,    82,     140,     44,      40)

        //Animation Data (8 Frames / State)
        const frames = new Frames (8,3)

        //Sprite Creation
        const attack = new AttackVFX(SpriteId.ATTACK_VFX, STATE, xPos, yPos, imageSet, frames)

        //Adds Sprite to Array
        globals.sprites.push(attack)
}

function initPlayerFireball(xPos, yPos, STATE) {
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(6,       2,      80,    82,     140,     36,      40)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,6)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(100);
    const hitBox = new HitBox(43, 26, 30, 34)
    //Sprite Creation
    const fireball = new Fireball(SpriteId.FIREBALL, STATE, xPos, yPos, imageSet, frames, physics, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(fireball)
}

function initSkeleton(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(14,       0,      125,    90,     140,      20,      60)

    //Animation Data (7 Frames / State)
    const frames = new Frames (7,6)

    //Creates Physic obj with vLimit 40
    const physics = new UniformHorizontalMove(40);

    const hitBox = new HitBox(35, 64, 45, 26)
    // const initTimeToChangeDirection = Math.floor(Math.random() * 3) +1;

    //Sprite Creation
    const skeleton = new Skeleton(SpriteId.SKELETON, State.RUN_LEFT_2, 400, 127, imageSet, frames, physics, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(skeleton)
}

function initKey(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(22,       0,      30,    35,     140,      60,      43)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8,11)
    const hitBox = new HitBox(13, 31, 10, 5)
    //Sprite Creation
    const key = new Key(SpriteId.KEY, State.IDLE_3, 300, 220, imageSet, frames, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(key)
}

function initCheckPoint(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(16,       2,      35,    45,     140,     64,      110)

    //Animation Data (8 Frames / State)
    const frames = new Frames (5,8)
    const hitBox = new HitBox(25, 38, 5, 3)
    //Sprite Creation
    const checkpoint = new Checkpoint(SpriteId.CHECKPOINT, State.IDLE_3, 167, 217, imageSet, frames, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(checkpoint)

}

function initDoor(){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(17,       2,      11,    96,     140,     68,      54)

    //Animation Data (8 Frames / State)
    const frames = new Frames (4,12)
    const hitBox = new HitBox(12, 96, 0, 0)
    //Sprite Creation
    const door = new Door(SpriteId.DOOR, State.IDLE_3, 420, 127, imageSet, frames, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(door)

}
function initJumpVFX(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(4  ,       3,      80,    40,     140,     40,      110)

    //Animation Data (8 Frames / State)
    const frames = new Frames (4,8)


    //Sprite Creation
    const jump = new JumpVFX(SpriteId.JUMPVFX, State.IDLE_3, (xPos+33), (yPos+60), imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(jump)

}

function initParchment() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(19,       4,      576,    445,     140,     0,      45)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1)

        //Sprite Creation
        const parchment = new Parchment(SpriteId.PARCHMENT, State.IDLE_3, 0, 0, imageSet, frames)

        //Adds Sprite to Array
        globals.sprites.push(parchment)
}

function initPlatform() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(18,       4,      100,    9,     140,     32,      142)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1)

        //Initial Physics values
        const initAngle = 90 * Math.PI / 180;
        const omega = 0.7;
        const xRotCenter = globals.canvas.width /2;
        const yRotCenter = globals.canvas.height /2;

        const physics = new Eliptic(60, 0, 1, omega, initAngle, xRotCenter, yRotCenter);
        const hitBox = new HitBox(92, 9, 4,0)

        //Sprite Creation
        const platform = new Platform(SpriteId.PLATFORM, State.PLATFORM_RIGHT, 100, 250, imageSet, frames,physics,hitBox,3)

        // setPlatformPosition(platform);

        //Adds Sprite to Array
        globals.sprites.push(platform)
        globals.platforms.push(platform)

}

function initPlatformHorizontal() {
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(18,       4,      100,    9,     140,     32,      142)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Initial Physics values

    const physics = new UniformHorizontalMove(40)
    const hitBox = new HitBox(92, 9, 4, 0)

    //Sprite Creation
    const platform = new Platform(SpriteId.PLATFORM, State.PLATFORM_RIGHT, 100, 180, imageSet, frames,physics,hitBox,2)

    // setPlatformPosition(platform);

    //Adds Sprite to Array
    globals.sprites.push(platform)
    globals.platforms.push(platform)
}

function initPlatformVertical() {
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(18,       4,      100,    9,     140,     32,      142)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Initial Physics values

    const physics = new UniformHorizontalMove(40)
    const hitBox = new HitBox(92, 9, 4, 0)

    //Sprite Creation
    const platform = new Platform(SpriteId.PLATFORM, State.PLATFORM_RIGHT, 100, 180, imageSet, frames,physics,hitBox,1)

    // setPlatformPosition(platform);

    //Adds Sprite to Array
    globals.sprites.push(platform)
    globals.platforms.push(platform)
}

function initDummy() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(23,       0,      67,    66,     140,     48,      81)

        //Animation Data (8 Frames / State)
        const frames = new Frames (8,8)

        //Sprite Creation
        const dummy = new Dummy(SpriteId.DUMMY, State.IDLE, 100, 70, imageSet, frames)

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


export {initHTMLelements, initVars, loadAssets, initSprites,initLevel, initMainMenuSprites, initMainMenuMap, initParchmentBackground, initTimers, initEvents,initPlayerFireball, initPlayerAttackVFX, initJumpVFX }