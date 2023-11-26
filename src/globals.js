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
    txtPruebas: {}
}