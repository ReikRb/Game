import { Game } from "./constants.js";

export default {

    //Canvas y Context
    canvas: {},
    ctx: {},

    //Estado de juego
    gameState: Game.INVALID,

    //Tiempo de ciclo anterior (ms.)
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego real (seconds)
    deltaTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    //Debugger Text Box
    txtPruebas: {},

    //Img Data(TILESET)
    tileSet:{},

    //Stores elements to load(IMG/Sounds)
    assetsToLoad: [],

    //Counter of elements loaded in game
    assetsLoaded: 0,

    //Sprites Data Array
    sprites: [],

    //Img Data (TILE-SET). Modified by Array
    tileSets: [],

    //Level Data
    level: {}
}