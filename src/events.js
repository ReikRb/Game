import { Key, Sound } from "./constants.js";
import globals from "./globals.js";

export function keydownHandler(event) {
    switch (event.keyCode) {
        case Key.LEFT:
            globals.action.moveLeft = true;
            break;

        case Key.RIGHT:
            globals.action.moveRight = true;
            break;

        case Key.UP:
            globals.action.moveUp = true;
            break;
    
        case Key.DOWN:
            globals.action.moveDown = true;
            break;

        case Key.FIRE:
            globals.action.fire = true;
            break;
        
        case Key.JUMP:
            globals.action.jump = true;
            break;

        case Key.RETURN:
            globals.action.return = true;
            break;

    }
}

export function keyupHandler(event) {
    switch (event.keyCode) {
        case Key.LEFT:
            globals.action.moveLeft = false;
            break;

        case Key.RIGHT:
            globals.action.moveRight = false;
            break;

            case Key.UP:
                globals.action.moveUp = false;
                break;
    
            case Key.DOWN:
                globals.action.moveDown = false;
                break;

        case Key.FIRE:
            globals.action.fire = false;
            break;

        case Key.JUMP:
            globals.action.jump = false;
            break;

        case Key.RETURN:
            globals.action.return = false;
            break;
    }
}

export function updateMusic() {
    const buffer = 0.3
    const music  = globals.sounds[Sound.GAME_MUSIC]
    if (music.currentTime > music.duration - buffer) {
        music.currentTime = 0
        music.play()
    }
}