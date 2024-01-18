import globals from "./globals.js"
import {Game, FPS, SpriteId, State, ParticleID, ParticleState, GRAVITY} from "./constants.js"
import { Player } from "./sprites/Player.js";
import { Skeleton } from "./sprites/Skeleton.js";
import { EmptyCrystal } from "./sprites/EmptyCrystal.js";
import { Life } from "./sprites/Life.js";
import { Crystal } from "./sprites/Crystal.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1, monster1,  mainMenu } from "./Level.js";
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
import { Spike } from "./sprites/Spike.js";
import Camera from "./Camera.js";
import  ExplosionParticle  from "./particles/Explosion.js";
import FireParticle from "./particles/Fire.js";
import { LobbyPlayer } from "./sprites/LobbyPlayer.js";
import GravityParticle from "./particles/Gravity.js";
import BubbleParticle from "./particles/Bubble.js";
import StarParticle from "./particles/Star.js";
import Line from "./Line.js";
import MenuParticle from "./particles/Menu.js";

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

function initTimersTemporal() {
    //Sets timer to 200 with changes/0,5s.
    globals.PruebaTime = new Timer(180, 1.24)
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
        globals.gameState = Game.LOAD_MAIN_MENU;
    }
}

function initCamera() {
    globals.camera = new Camera(0, 0)
}
function initParticles() {
    // initExplosion()
    // initFire()
}

function initFire(xPos, yPos) {
    const numParticles = 20
    for (let i = 0; i < numParticles; i++) {
        createFireParticle(xPos,yPos)
        
    }
}
function createFireParticle(xPos, yPos) {
    const alpha     = 1.0
    const velocity  = Math.random() * 20 
    const physics   = new Physics(velocity)

    const xInit     = Math.random()  + xPos
    const yInit     = yPos
    const radius    = 3 * Math.random() +1

    const particle  = new FireParticle(ParticleID.FIRE, ParticleState.ON, xInit, yInit, radius, alpha, physics)

    const rngAngle  = Math.random() * Math.PI / 3 + 3 * Math.PI/2
    
    // particle.physics.vx = particle.physics.vLimit * Math.cos(rngAngle)
    particle.physics.vy = particle.physics.vLimit * Math.sin(rngAngle)

    globals.particles.push(particle)
}
function initExplosion(xPos, yPos) {
    const numParticles  = 300
    const radius        = 0.7
    const timeToFadeMax = 0.2
    const alpha         = 1.0
    let colour
    const randomX       = Math.floor(Math.random()*50)-10
    const randomY       = Math.floor(Math.random()*30)



    for (let i = 0; i < numParticles; i++) {
        const randomValue   = Math.floor(Math.random() * 6)
        switch (randomValue) {
            case 0:
                colour = '#CE2029'
                break;
    
            case 1:
                colour = '#FF664B'
                break;
            
            case 2:
                colour = "#d1e231"
                break;
                
            case 3:
                colour = "#4cc050"
                break;
    
            case 4:
                colour = "#x0d9eff"
                break;
    
            case 5:
                colour = "#a846c6"
                break;
    
            default:
                
                break;
        }
        const velocity      = Math.random() * 25 + 5
        const physics       = new Physics(velocity)
        
        const timeToFade    = timeToFadeMax * Math.random() + 1
        const particle      = new ExplosionParticle(ParticleID.EXPLOSION, ParticleState.ON, (xPos+randomX), (yPos - randomY), radius, alpha, physics, timeToFade,colour)
    
        const randomAngle   = Math.random()* 2 * Math.PI
        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle)
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle)

        globals.particles.push(particle)
    }
    globals.fireworkCounter++
}
function initGravityExplosion(xPos, yPos) {
    const numParticles  = 200
    const radius        = 0.9

    const alpha         = 1.0

    for (let i = 0; i < numParticles; i++) {
    const velocity      = Math.random() * 25 + 5
    const acceleration = 20
    const physics       = new Physics(velocity, acceleration)
        
    const timeToFade    = 1.5
    const particle      = new GravityParticle(ParticleID.GRAVITYEXPLOSION, ParticleState.ON, xPos, yPos, radius, alpha, physics, timeToFade)
    
    const randomAngle   = Math.random()* 2 * Math.PI
    particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle)
    particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle)

    particle.physics.ax = -particle.physics.vLimit * Math.cos(randomAngle)
    particle.physics.ay = -particle.physics.vLimit * Math.sin(randomAngle)

    globals.particles.push(particle)
    }
}

function initBubbleParticle(xPos, yPos) {
    const numParticles  = 5
    const radius        = 3

    const alpha         = 1.0

    for (let i = 0; i < numParticles; i++) {
    const velocity      = 150
    const acceleration = 5
    const physics       = new Physics(velocity, acceleration)
    
    const randomX       = Math.random()*40
    const randomY       = Math.random()*40
    const timeToFade    = Math.random()*1+0.5
    const particle      = new BubbleParticle(ParticleID.BUBBLE, ParticleState.ON, (xPos+randomX), (yPos + randomY), radius, alpha, physics, timeToFade)
    
    const randomAngle   = Math.random()* 2 * Math.PI
    // particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle)
    particle.physics.vy = 20

    // particle.physics.ax = -particle.physics.vLimit * Math.cos(randomAngle)
    particle.physics.ay = GRAVITY

    globals.particles.push(particle)
    }
}

function initStarParticle() {
    const randomX = Math.random()* level1[0].length *32 
    const radius        = 3
    const alpha         = 1.0

    const velocity      = 150
    const acceleration = 5
    const physics       = new Physics(velocity, acceleration)
    
    const randomY       = Math.random()*400
    const timeToFade    = 1.5
    const particle      = new StarParticle(ParticleID.STAR, ParticleState.ON, randomX,  randomY, radius, alpha, physics, timeToFade)
    
    particle.physics.vx = -50
    
    particle.physics.vy = -200


    globals.particles.push(particle)
}

function initMenuParticle() {

    const initAngle = 90 * Math.PI / 180;
    const omega = 3;
    const xRotCenter = 400;
    const yRotCenter = 30;
    const radius        = 3
    const alpha         = 1.0

    const physics = new Eliptic(60, 0, 1, omega, initAngle, xRotCenter, yRotCenter);
    
    const timeToFade    = 1.5

    const particle      = new MenuParticle(ParticleID.MENUPARTICLE, ParticleState.ON, 0,  90, radius, alpha, physics, timeToFade)


    globals.particles.push(particle)
}


function initSprites() {
    initPlayer(330, 1114);
    initChair();
    for (let i = 0; i < monster1.length; i++) {
        
        for (let j = 0; j < monster1[i].length; j++) {
            let ID = monster1[i][j]
            let xPos = j*32
            let yPos = i*32
            switch (ID) {
                case 1:
                    initCheckPoint(xPos, yPos);
                    break;
                case 2:
                    initSkeleton(xPos, yPos);
                    break;
                
                case 3:
                    initPower(xPos, yPos)
                    break;
                case 4:
                    initKey(xPos, yPos);
                    break;
                case 5:
                    initDoor(xPos, yPos);
                    break;

                case 6:
                    initSpike(xPos,(yPos+16),0)
                    break;
                case 7:
                    initSpike(xPos,yPos,1)
                    break;
                case 8:
                    initSpike((xPos+16),yPos,2)
                    break;
                case 9:
                    initSpike(xPos,yPos,3)
                    break;
                case 10:
                    initPlatformVertical(xPos,yPos, 100)
                    break;
                case 11:
                    initPlatformVertical(xPos,yPos, 350)
                    break;
                    
                case 12:
                    initPlatformVertical(xPos,yPos, 200)
                    break;

                case 13:
                    initPlatformHorizontal(xPos,yPos,200)
                    break;

                case 14:
                    initPlatform(xPos,yPos)
                    break;

                case 15:
                    initPlatform(xPos,yPos,1.6)
                    break;

                case 16:
                    initSkeleton(xPos, yPos, 0, 2, State.ATTACK_RIGHT_2)
                    break;
                
                case 17:
                    initSkeleton(xPos, yPos, 0, 2, State.ATTACK_LEFT_2)
                    break;

                default:
                    break;
                }
            }
        }
        initEmptyCrystal(95,2);
        initEmptyCrystal(128,2);
        initLife();
        initMana();
        initPowerHUD();
        initKeyHUD();
        

        for (let i = 0; i < 200; i++) {
            initStarParticle()  
        }



    // initPlatform()

   
}

function initMainMenuSprites() {
    initLobbyPlayer(50, 180, State.ATTACK_RIGHT)
    initChair();
    initDummy()
}

function initParchmentBackground() {
    initParchment()
}

//Interface inits
function initEmptyCrystal(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       4,      28,    51,     140,      70,      88)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

    //Sprite Creation
    const EmptyCrystalLife = new EmptyCrystal(SpriteId.EMPTY_CRYSTAL, State.IDLE_3, xPos, yPos, imageSet, frames)

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
    
}

function initCrystal(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(9,       5,      28,    51,     140,     70,      88)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1,2)

    //Creates Physic obj with vLimit 40
    const physics = new Physics(70);
    const hitBox = new HitBox(30, 51, 0, 0)

    //Sprite Creation
    const mana = new Crystal(SpriteId.MANACRYSTAL, State.IDLE_3, (xPos+40), (yPos+10), imageSet, frames, physics, hitBox)

    mana.physics.vx = mana.physics.vLimit;
    mana.physics.vy = mana.physics.vLimit;

    //Adds Sprite to Array
    globals.sprites.push(mana)
}

function initPower(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8,       4,      50,    50,     140,     54,      55)

    //Animation Data (8 Frames / State)
    const frames = new Frames (2,6)
    frames.frameCounter = 1
    const hitBox = new HitBox(38, 43, 10, 3)
    //Sprite Creation
    const power = new Power(SpriteId.POWER, State.IDLE_3, xPos, yPos, imageSet, frames, hitBox)
    
    //Adds Sprite to Array
    globals.sprites.push(power)
    

}
function initSpike(xPos,yPos, type){
    let imageSet
    let hitBox
    
        //Animation Data (8 Frames / State)
        const frames = new Frames (1)

    switch (type) {
        case 0:    
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        imageSet = new ImageSet(7,       (4 + type),      32,    16,     140,     10,      134)
        hitBox = new HitBox(32, 16, 0, 0)    
            break;
        case 1:    
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        imageSet = new ImageSet(7,       (4 + type),      16,    32,     140,     10,      118)
        hitBox = new HitBox(16, 32, 0, 0)    
            break;
        case 2:    
            //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
            imageSet = new ImageSet(7,       (4 + type),      16,    32,     140,     10,      118)
            hitBox = new HitBox(16, 32, 0, 0)    
                break;
        case 3:    
            //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
            imageSet = new ImageSet(7,       (4 + type),      32,    16,     140,     10,      134)
            hitBox = new HitBox(32, 16, 0, 0)    
                break;
        default:
            break;
    }


    //Sprite Creation
    const spike = new Spike(SpriteId.SPIKE, State.IDLE_3, xPos, yPos, imageSet, frames, hitBox)
    
    //Adds Sprite to Array
    globals.sprites.push(spike)
    

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
function initPlayer(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0,       0,      140,    110,     140,     10,      40)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8, 3)

    //Creates Physic obj with vLimit 40
    const physics = new PlayerPhysics(130, 130, 0.1, -500);

    const hitBox = new HitBox(34, 81, 48, 28)

    //Sprite Creation
    const player = new Player(SpriteId.PLAYER, State.IDLE_RIGHT, xPos, yPos, imageSet, frames, physics,hitBox)
    player.previousLife = globals.life
    player.previousState = -1
    //Adds Sprite to Array
    globals.sprites.push(player)
}

function initLobbyPlayer(xPos, yPos,state){
    const imageSet = new ImageSet(0,       0,      140,    110,     140,     10,      40)
    
    const frames = new Frames (7, 6)

    const player = new LobbyPlayer(SpriteId.LOBBYPLAYER, state, xPos, yPos, imageSet,frames)
    
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
    globals.shoots.push(fireball)
}

function initSkeleton(xPos, yPos, speed = 40, hp = 3, state = State.RUN_LEFT_2){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(14,       0,      125,    90,     140,      20,      60)

    //Animation Data (7 Frames / State)
    const frames = new Frames (7,6)

    //Creates Physic obj with vLimit 40
    const physics = new UniformHorizontalMove(speed);

    const hitBox = new HitBox(35, 64, 45, 26)
    // const initTimeToChangeDirection = Math.floor(Math.random() * 3) +1;

    //Sprite Creation
    const skeleton = new Skeleton(SpriteId.SKELETON, state, (xPos-15), yPos, imageSet, frames, physics, hitBox,hp)

    //Adds Sprite to Array
    globals.sprites.push(skeleton)
}

function initKey(xPos,yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(22,       0,      30,    35,     140,      60,      43)

    //Animation Data (8 Frames / State)
    const frames = new Frames (8,11)
    const hitBox = new HitBox(13, 31, 10, 5)
    //Sprite Creation
    const key = new Key(SpriteId.KEY, State.IDLE_3, xPos, yPos, imageSet, frames, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(key)
}

function initCheckPoint(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(16,       2,      35,    45,     140,     64,      110)

    //Animation Data (8 Frames / State)
    const frames = new Frames (5,8)
    const hitBox = new HitBox(25, 38, 5, 3)
    //Sprite Creation
    const checkpoint = new Checkpoint(SpriteId.CHECKPOINT, State.IDLE_3, xPos, (yPos+25), imageSet, frames, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(checkpoint)

}

function initDoor(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(17,       2,      11,    96,     140,     68,      54)

    //Animation Data (8 Frames / State)
    const frames = new Frames (4,12)
    const hitBox = new HitBox(12, 96, 0, 0)
    //Sprite Creation
    const door = new Door(SpriteId.DOOR, State.IDLE_3, xPos, yPos, imageSet, frames, hitBox)

    //Adds Sprite to Array
    globals.sprites.push(door)

}
function initJumpVFX(xPos, yPos){
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(4  ,       3,      80,    40,     140,     40,      110)

    //Animation Data (8 Frames / State)
    const frames = new Frames (4,8)


    //Sprite Creation
    const jump = new JumpVFX(SpriteId.JUMPVFX, State.IDLE_3, (xPos+20), (yPos+60), imageSet, frames)

    //Adds Sprite to Array
    globals.sprites.push(jump)

}

function initParchment() {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(19,       4,      596,    445,     140,     10,      10)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1)

        //Sprite Creation
        const parchment = new Parchment(SpriteId.PARCHMENT, State.IDLE_3, 0, 0, imageSet, frames)

        //Adds Sprite to Array
        globals.sprites.push(parchment)
}

function initPlatform(xPos, yPos, speed=0.7) {
        //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
        const imageSet = new ImageSet(18,       4,      100,    15,     140,     32,      135)

        //Animation Data (8 Frames / State)
        const frames = new Frames (1)

        //Initial Physics values
        const initAngle = 90 * Math.PI / 180;
        const omega = speed;
        const xRotCenter = xPos;
        const yRotCenter = yPos;

        const physics = new Eliptic(60, 0, 1, omega, initAngle, xRotCenter, yRotCenter);
        const hitBox = new HitBox(92, 15, 4,0)

        //Sprite Creation
        const platform = new Platform(SpriteId.PLATFORM, State.PLATFORM_RIGHT, xPos, yPos, imageSet, frames,physics,hitBox,3)

        // setPlatformPosition(platform);

        //Adds Sprite to Array
        globals.sprites.push(platform)
        globals.platforms.push(platform)

}

function initPlatformHorizontal(xPos,yPos,maxRange=100) {
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(18,       4,      100,    15,     140,     32,      135)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Initial Physics values

    const physics = new UniformHorizontalMove(60)
    const hitBox = new HitBox(92, 15, 4, 0)

    //Sprite Creation
    const platform = new Platform(SpriteId.PLATFORM, State.PLATFORM_RIGHT, xPos, yPos, imageSet, frames,physics,hitBox,2, maxRange)

    // setPlatformPosition(platform);

    //Adds Sprite to Array
    globals.sprites.push(platform)
    globals.platforms.push(platform)
}

function initPlatformVertical(xPos, yPos, maxRange) {
    //Img Properties:          initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(18,       4,      100,    15,     140,     32,      135)

    //Animation Data (8 Frames / State)
    const frames = new Frames (1)

    //Initial Physics values

    const physics = new UniformHorizontalMove(40)
    const hitBox = new HitBox(92, 15, 4, 0)

    //Sprite Creation
    const platform = new Platform(SpriteId.PLATFORM, State.PLATFORM_RIGHT, xPos+15, yPos, imageSet, frames,physics,hitBox,1, maxRange)

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

function initText(text, lettersQuantity) {
    // const lines = Math.ceil(text.length / lettersQuantity)
    const words = text.split(" ")
    let lines = []
    let line = ""
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if ((line + word ).length < lettersQuantity) {
            line += (word + " ")
            if ((i+1) === words.length) {
                lines.push(line)
                break;
            }
        } else {
            lines.push(line)
            line = ""
            line += word + " "
            
        }   
    }

    for (let i = 0; i < lines.length; i++) {
        const lineText  = lines[i]
        const xPos      = 60
        const yPos      = 80 + 17 * i

        const line      = new Line(xPos, yPos, lineText)

        globals.lines.push(line)
        
    }
}

export {initTimersTemporal, initHTMLelements, initVars, loadAssets, initSprites,initLevel, initMainMenuSprites, initMainMenuMap, initParchmentBackground, initTimers, initEvents, initCamera, initParticles, initMenuParticle, initExplosion, initFire, createFireParticle, initGravityExplosion, initBubbleParticle, initStarParticle, initPlayerFireball, initPlayerAttackVFX, initJumpVFX, initCrystal, initPower, initLobbyPlayer, initText }