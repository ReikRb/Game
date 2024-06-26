import { isCollidingWithObstacleAt } from "./collisions.js";
import { Key, Sound, State, ScoreWheel, Game } from "./constants.js";
import globals from "./globals.js";
import { calculatePositionHighScore, HighScore } from "./HighScore.js";
import { initSkeleton, initCrystal, initScores } from "./initialize.js";
import { eventPos, levels } from "./Level.js";

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

        case Key.ENTER:
            globals.action.enter = true;
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

        case Key.ENTER:
            globals.action.enter = false;
            break;
    }
}

export function updateMusic() {
    
    const buffer = 0.01
    const music  = globals.sounds[gameMusic()]
    if (music.currentTime > music.duration - buffer) {
        music.currentTime = 0
        music.play()
    }
}
function gameMusic() {
    const state = globals.gameState

    switch (state) {
        case Game.PLAYING:
        case Game.WIN:
            return Sound.GAME_MUSIC

        case Game.MAIN_MENU:
            return Sound.MENU_MUSIC
        
        case Game.HISTORY:
            return Sound.STORY_MUSIC

        case Game.GAMEOVER:
             let sound = globals.currentLevel < levels.length ? Sound.GAME_OVER_MUSIC : Sound.VICTORY_MUSIC
            return sound
    
        default:
            break;
    }
}
export function createEnemiesEvent() {

    if (globals.mana === 0 && globals.eventCounter === 0) {
        const player = globals.sprites[0]
        let SkeletonX = player.xPos - 150
        let SkeletonY = player.yPos - 50
    
        if (!isCollidingWithObstacleAt(SkeletonX, SkeletonY)) {
            initSkeleton(SkeletonX, SkeletonY, 60, 1, State.RUN_RIGHT_2,400)
        }
    
         SkeletonX = player.xPos + 200
         SkeletonY = player.yPos - 50
    
        if (!isCollidingWithObstacleAt(SkeletonX, SkeletonY)) {
            initSkeleton(SkeletonX, SkeletonY, 60, 1, State.RUN_LEFT_2,400)
        }
        globals.eventCounter++
    } else{
        if (globals.mana > 0) {
            globals.eventCounter = 0
        } else if (globals.mana === 0 && globals.eventCounter != 0) {
            globals.eventCounter++
        }

        if (globals.eventCounter > 50) {
            globals.eventCounter = 0
        }
    }
    
    
}

export function timedAttackEvent(){
    const player = globals.sprites[0]
    let crystalX = player.xPos -   150
    let crystalY = player.yPos -    50
    if (globals.innerTime.value % globals.appearTime === globals.appearTime-1) {
        globals.innerTime.value = 0
        initCrystal(crystalX, crystalY, 1)
        
    }
}

export function positionMonsterEvent() {
    const player = globals.sprites[0]
    const spawnPosX = eventPos[globals.currentLevel][0]
    const spawnPosY = eventPos[globals.currentLevel][1]

if (player.xPos > spawnPosX         &&
    player.xPos < (spawnPosX + 30) &&
    player.yPos > spawnPosY -50     &&
    player.yPos < spawnPosY +1        &&
    globals.monsterEventCounter <  ((globals.currentLevel *50)+50)
    ) {
    
        if (globals.monsterEventCounter % 50 === 0) {
            let SkeletonX = player.xPos - 150
            let SkeletonY = player.yPos - 50
        
            if (!isCollidingWithObstacleAt(SkeletonX, SkeletonY)) {
                initSkeleton(SkeletonX, SkeletonY, 60, 1, State.RUN_RIGHT_2,400)
            }
        
             SkeletonX = player.xPos + 200
             SkeletonY = player.yPos - 50
        
            if (!isCollidingWithObstacleAt(SkeletonX, SkeletonY)) {
                initSkeleton(SkeletonX, SkeletonY, 60, 1, State.RUN_LEFT_2,400)
            }
    
            globals.monsterEventCounter++
            
        } else {
            globals.monsterEventCounter++
        }
}

                
            
}

export function getScores() {
    const url = "https://woundsvalleyinn.vercel.app/server/routes/getAllClassic.php"
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        
        this.readyState     != 4     ? false :
        this.status         != 200   ? alert("Communication error: " + this.statusText) :
        this.responseText   === null ? alert("Communication error: No data received") :
        initScores(JSON.parse(this.responseText))

        this.onload = () => {
            if (globals.gameState === Game.GAMEOVER) {
                calculatePositionHighScore()
                globals.highScorePage = Math.floor(globals.scorePos / 10) 
                globals.gameState = Game.OVER_SCORE
                globals.posted   = false
            } else if (globals.gameState === Game.LOADING) {
                
                globals.gameState = Game.LOAD_MAIN_MENU
            }
            
          };
    }

    request.open('GET', url, true)
    request.responseType = "text"
    request.send()
}

export function postScore(){
    if (!globals.posted) {
        const id = globals.highScores.length
        const name = "" + ScoreWheel[globals.scoreWheelValues[0]] + ScoreWheel[globals.scoreWheelValues[1]] + ScoreWheel[globals.scoreWheelValues[2]]
        const score = globals.score
        const newHighScore = new HighScore(globals.highScores.length, name, score)
        globals.highScores.push(newHighScore)
            
        const dataToSend ='name=' + newHighScore.name + '&score=' + newHighScore.score
        const url = "https://woundsvalleyinn.vercel.app/server/routes/postClassic.php"
        const request = new XMLHttpRequest();
    
        request.open('POST', url, true)
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    
        request.onreadystatechange = function () {
            // const resultJSON = JSON.parse(this.responseText)
            // const arrayResult = [resultJSON]
            this.readyState     != 4     ? false                                            :
            this.status         != 200   ? alert("Communication error: " + this.statusText) :
            this.responseText   === null ? alert("Communication error: No data received")   :
            false

            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                globals.highScores = []
                getScores()
              }
        }
    

        request.responseType = "text"
        request.send(dataToSend)

    }

}