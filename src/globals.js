import { Game } from "./constants.js";

export default {

    //Canvas y Context
    canvas: {},
    ctx: {},
    canvasHUD: {},
    ctxHUD: {},

    //Estado de juego
    gameState: Game.INVALID,

    //Tiempo de ciclo anterior (ms.)
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego real (seconds)
    deltaTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    //Temporizador nivel
    levelTime: {},

    PruebaTime: {},

    //Debugger Text Box
    txtPruebas: {},

    //Img Data(TILESET)
    tileSet: {},

    //Stores elements to load(IMG/Sounds)
    assetsToLoad: [],

    //Counter of elements loaded in game
    assetsLoaded: 0,

    //Sprites Data Array
    sprites: [],
    platforms: [],
    shoots: [],

    //Img Data (TILE-SET). Modified by Array
    tileSets: [],

    //Level Data
    level: {},

    //Obj that saves pressed key state
    action: {},

    //Life
    life: 200,
    damagedCounter: 0,
    inmune: false,

    //Mana
    mana: 100,

    score: 0,
    highScore: 1000,
    //Obtained Key
    key: false,

    //Power DATA
    power: false,
    powerPreviousState: false,
    powerX: 0,
    powerY: 0,

    //Particles
    particles: [],
    fireworkCounter: 0,

    position: 1,
    positionCD: 0,

    lines:[],
    lineCounter: 0,
    typingCounter: 0,
}