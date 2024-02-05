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
    cycleRealTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    //Temporizador nivel
    levelTime: {},

    currentLevel: 0,
    innerTime: {},
    appearTime: 50,

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

    sounds: [],

    currentSound: -1,

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

    monsterEventCounter: 0,

    position: 1,
    positionCD: 0,

    lines:[],
    lineCounter: 0,
    typingCounter: 0,

    scoreWheelValues: [0,0,0],

    highScores:[
        {
            id: 0,
            name: "ABD",
            score: 5000
            
        },
        {
            id: 1,
            name: "URB",
            score: 12000
            
        },
        {
            id: 2,
            name: "ORB",
            score: 5300
            
        },
        {
            id: 3,
            name: "MLG",
            score: 1000
            
        },
        {
            id: 4,
            name: "XXX",
            score: 9900
            
        },
        {
            id: 5,
            name: "ABD",
            score: 8800
            
        },
        {
            id: 6,
            name: "MSD",
            score: 1200
            
        },
        {
            id: 7,
            name: "SRK",
            score: 6000
            
        },
        {
            id: 8,
            name: "TYP",
            score: 16000
            
        },
        {
            id: 9,
            name: "ABD",
            score: 11000
            
        },
        {
            id: 10,
            name: "URB",
            score: 3500
            
        },
        {
            id: 11,
            name: "AVD",
            score: 14000
            
        },

    ]
}