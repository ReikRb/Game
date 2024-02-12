import globals from "./globals.js"
import { Game, State, Sound, ScoreWheel, SpriteId } from "./constants.js"
import { initMainMenuMap, initMainMenuSprites, initSprites, initLevel, initParchmentBackground, initPower, initGravityExplosion, initLobbyPlayer, initText, initMenuParticle, initTimersTemporal, initGameOver } from "./initialize.js";
import detectCollisions from "./collisions.js";
import { story } from "./Text.js";
import { createEnemiesEvent, getScores, positionMonsterEvent, postScore, timedAttackEvent, updateMusic } from "./events.js";
import { levels } from "./Level.js";
import { HighScore, calculatePositionHighScore, createHighScores, sortHighScores } from "./HighScore.js";

export default function update() {
    //Modifies Game Depending On Game State
    switch (globals.gameState) {
        case Game.LOADING:
            console.log("Loading assets...");
            updateLoading()
            // createHighScores()
            break;

        case Game.LOAD_MAIN_MENU:
            globals.score = 0
            globals.currentLevel = 0

            restoreDefaultValues()
            initMainMenuMap()
            initMainMenuSprites()
            initMenuParticle()
            globals.gameState = Game.MAIN_MENU
            break;

        case Game.MAIN_MENU:
            updateSprites()
            updateSelection()
            updateParticles()
            updateMusic(Sound.MENU_MUSIC)
            break;

        case Game.LOAD_LEVEL:
            restoreDefaultValues()
            initTimersTemporal()
            globals.currentLevel = 1
            initLevel()
            globals.score = 10100
            globals.key = true
            // globals.levelTime.value = 5
            initSprites()
            globals.gameState = Game.PLAYING
            break;

        case Game.PLAYING:
            playGame();

            break;

        case Game.WIN:
            globals.sprites = []
            nextLevel()
            // initLobbyPlayer(200, 190, State.IDLE_RIGHT)
            break;

        case Game.LOAD_HIGHSCORE:
            globals.sprites = []
            initParchmentBackground();
            getScores()
            sortHighScores()
            globals.gameState = Game.HIGHSCORE
            break;

        case Game.HIGHSCORE:
            updateSelection()
            updateHighScorePage()
            break;

        case Game.GAMEOVER:
            globals.sprites = []
            selectOverMusic()
            initGameOver()
            calculatePositionHighScore()
            updateGameOverMusic()
            globals.gameState = Game.GAMEOVER2
            break;

        case Game.GAMEOVER2:
            updateSprites()
            updateSelection()
            updateScoreWheel()
            postScore()
            updateGameOverMusic()
            break;

        case Game.OVER_SCORE:
            updateSelection()
            break;
        

        case Game.CONTROLS:
            globals.sprites = []
            initParchmentBackground();
            updateSelection()
            break;


        case Game.LOAD_HISTORY:
            globals.sprites = []
            initParchmentBackground();
            initText(story, 80)
            globals.gameState = Game.HISTORY
            break;

        
        case Game.HISTORY:
            
            updateSelection()
            updateText()
            break;

        default:
            console.error("Error: Game State invalid")

    }

}
function selectOverMusic() {
    globals.sounds[Sound.GAME_MUSIC].pause()
    if (globals.currentLevel < levels.length) {
        globals.sounds[Sound.GAME_OVER_MUSIC].play()
    } else{
        globals.sounds[Sound.VICTORY_MUSIC].play()
  
    }
}

function updateGameOverMusic() {

    if (globals.currentLevel < levels.length) {
        updateMusic(Sound.GAME_OVER_MUSIC)
    } else{
        updateMusic(Sound.VICTORY_MUSIC)
    }

    
}
function updateLoading() {
    if (globals.action.enter && globals.assetsLoaded === globals.assetsToLoad.length) {

        globals.sounds[Sound.MENU_MUSIC].play()
        globals.sounds[Sound.MENU_MUSIC].volume = 0.4
        globals.positionCD++
        //Starts Game
        globals.gameState = Game.LOAD_MAIN_MENU;  
    }
}
function nextLevel() {
        if (globals.action.fire) {
            globals.score += globals.levelTime.value * 100
    
            globals.currentLevel++
    
            if (globals.currentLevel < levels.length) {
                globals.gameState = Game.LOAD_LEVEL
            } else {
                globals.gameState = Game.GAMEOVER
            }

    }
}
function updateText() {

    if (globals.lineCounter < globals.lines.length) {
        const line = globals.lines[globals.lineCounter];
        globals.story = line.text
        if (globals.typingCounter === 0) {
            if (line.typing.length < globals.story.length) {
                line.typing += globals.story[line.typing.length];
            } else{
                globals.lineCounter++
                globals.typingCounter = 0
            }
            // globals.typingCounter++
        }else{
            globals.typingCounter === 1 ? globals.typingCounter = 0 : globals.typingCounter++
        }  
    }
}

function updateHighScorePage() {
    if (globals.leftText >=150 &&
        globals.midText >=400 &&
        globals.rightText >=235) {
            if (globals.positionCD === 0) {
                const maxPages = Math.ceil(globals.highScores.length/10)
                if (globals.action.moveRight) {
                    console.log("pag1+");
                    globals.highScorePage++
                    globals.highScorePage = globals.highScorePage > maxPages-1 ? maxPages-1 : globals.highScorePage
                    globals.positionCD++
                } else if (globals.action.moveLeft) {
                    console.log("pag1-");
                    globals.highScorePage--
                    globals.highScorePage = globals.highScorePage < 0 ? 0 : globals.highScorePage
                    globals.positionCD++
                } 
            } else {
        
                globals.positionCD = globals.positionCD > 5 ? 0 : (globals.positionCD + 1)
        
            }
        }else {
            updateTextHighScore()
        }
}
function updateTextHighScore(){
    if (globals.typingCounter === 2) {
        globals.typingCounter = 0
        if (globals.leftText <150) {
            globals.leftText+=3
        }
        if (globals.midText<400) {
            globals.midText+=6
        }
        if (globals.rightText<235) {
            globals.rightText+=4
        }
    }else{
        globals.typingCounter++
    }
    resetText(globals.action.moveRight)
    resetText(globals.action.moveLeft)
}
function resetText(action) {
    const maxPages = Math.ceil(globals.highScores.length/10)
    if (globals.leftText >=150   && 
        globals.midText >= 400   && 
        globals.rightText >= 235 && 
        action === true          ) {
        if (globals.highScorePage+1 <= maxPages && action === globals.action.moveRight ||
            globals.highScorePage-1 >=0         && action === globals.action.moveLeft) {
                console.log("reseteo");
                globals.leftText = 0
                globals.midText = 0
                globals.rightText = 0
            
        }
    }
}

function updateScoreWheel() {
    if (globals.gameState === Game.GAMEOVER2) {
        if (globals.positionCD === 0) {
            if (globals.action.moveRight) {
                globals.position++
                globals.position = globals.position > 3 ? 3 : globals.position
                globals.positionCD++
            } else if (globals.action.moveLeft) {
                globals.position--
                globals.position = globals.position < 1 ? 1 : globals.position
                globals.positionCD++
            } else if (globals.action.moveUp) {
                globals.scoreWheelValues[globals.position-1]++
                globals.scoreWheelValues[globals.position-1] = globals.scoreWheelValues[globals.position-1] > 24 ? 0 : globals.scoreWheelValues[globals.position-1]
                globals.positionCD++
            } else if (globals.action.moveDown) {
                globals.scoreWheelValues[globals.position-1]--
                globals.scoreWheelValues[globals.position-1] = globals.scoreWheelValues[globals.position-1] < 0 ? 24 : globals.scoreWheelValues[globals.position-1]
                globals.positionCD++
            } 
        } else {

            globals.positionCD = globals.positionCD > 5 ? 0 : (globals.positionCD + 1)

        }
    } 
}


function updateSelection() {

    if (globals.gameState === Game.MAIN_MENU) {
        if (globals.positionCD === 0) {
            if (globals.action.moveDown) {
                globals.position++
                globals.position = globals.position > 4 ? 4 : globals.position
                globals.positionCD++
            } else if (globals.action.moveUp) {
                globals.position--
                globals.position = globals.position < 1 ? 1 : globals.position
                globals.positionCD++
            } else if (globals.action.enter) {
                switch (globals.position) {
                    case 1:
                        globals.sprites = []
                        globals.sounds[Sound.MENU_MUSIC].pause()
                        globals.sounds[Sound.GAME_MUSIC].play()
                        globals.sounds[Sound.GAME_MUSIC].volume = 0.4
                        globals.gameState = Game.LOAD_LEVEL;

                        break;

                    case 2:
                        globals.sounds[Sound.MENU_MUSIC].pause()
                        globals.sounds[Sound.STORY_MUSIC].play()
                        globals.gameState = Game.LOAD_HISTORY;
                        break;
                    case 3:
                        globals.gameState = Game.CONTROLS;
                        break;
                    case 4:
                        globals.gameState = Game.LOAD_HIGHSCORE;
                        break;

                    default:
                        break;
                }
            }
        } else {

            globals.positionCD = globals.positionCD > 5 ? 0 : (globals.positionCD + 1)

        }
    } else {
        if (globals.gameState === Game.OVER_SCORE) {
            if (globals.action.fire) {
                globals.gameState = Game.LOAD_HIGHSCORE;
            }
        }else if (globals.action.return) {
            globals.gameState = Game.LOAD_MAIN_MENU;
        }

    }
}

function playGame() {
    updateSprites();
    updateParticles();
    detectCollisions();
    updateCamera();
    updateLevelTime();
    updateInnerTime()
    updateMana();
    updateLife();
    updatePower();
    updateScore();
    createEnemiesEvent()
    timedAttackEvent()
    positionMonsterEvent()
    playSound(Sound.GAME_MUSIC)
    
}

function playSound(songName) {
    if (globals.currentSound != Sound.NO_SOUND) {
        globals.sounds[globals.currentSound].currentTime = 0
        globals.sounds[globals.currentSound].play()
        globals.currentSound = Sound.NO_SOUND
        globals.sounds[songName].volume = 0.4
    }
}

function updateInnerTime() {
    //Adds the value modifier counter
    globals.innerTime.timeChangeCounter += globals.deltaTime;

    //Once enough time has passed, modifies the timer value
    if (globals.innerTime.timeChangeCounter > globals.innerTime.timeChangeValue) {
        globals.innerTime.value++;

        //Then resets the timeChangeCounter
        globals.innerTime.timeChangeCounter = 0;
    }


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
    globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width) / 2)
    globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.ySize - globals.canvas.height) / 2)

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
function updateLife() {
    if (globals.damagedCounter != 0) {
        globals.damagedCounter++
        if (globals.damagedCounter === 80) {
            globals.damagedCounter = 0
            globals.inmune = false
        }
    }
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];

        if (sprite.isCollidingWithPlayer && sprite.id === SpriteId.SKELETON) {
            if (globals.damagedCounter === 0) {
                globals.life -= 25
                globals.currentSound = Sound.DAMAGE
                globals.damagedCounter++

            } 

        } else if (sprite.isCollidingWithPlayer && sprite.id === SpriteId.SPIKE) {
            if (globals.damagedCounter === 0) {
                globals.life = 0
                globals.currentSound = Sound.DAMAGE
                globals.damagedCounter++

            }
        }

        if (globals.life < 0) {
            globals.life = 0
        }
        if (globals.life > 200) {
            globals.life = 200
        }

    }

}

function updateMana() {
    globals.mana = globals.levelTime.value
    if (globals.levelTime.value < 0) {
        globals.levelTime.value = 0
        globals.mana = 0
    } else if (globals.levelTime.value > 200) {
        globals.levelTime.value = 200
        globals.mana = 200
    }
    if (globals.mana === 0) {
        globals.life--
    }
}

function updateScore(){
    globals.highScore = globals.score > globals.highScore ? globals.score : globals.highScore
}

function updateParticles() {
    for (let i = 0; i < globals.particles.length; i++) {
        const particle = globals.particles[i];
        particle.update()
    }
}

function restoreDefaultValues() {
    globals.levelTime.value     = 200
    globals.levelTime.timeChangeCounter = 0
    globals.innerTime.value = 0
    globals.innerTime.timeChangeCounter = 0

    globals.appearTime = 50

    globals.sprites             = []
    globals.platforms           = []
    globals.shoots              = []

    globals.life                = 200
    globals.damagedCounter      = 0
    globals.inmune              = false

    globals.mana                = 100

    globals.score               = 0
    globals.scoreWheelValues    = [0,0,0] 
    globals.scorePos            = 0
    globals.highScorePage       = 0

    globals.key                 = false

    globals.power               = false
    globals.powerPreviousState  = false
    globals.powerX              = 0
    globals.powerY              = 0

    globals.particles           = []
    globals.fireworkCounter     = 0

    globals.position            = 1

    globals.lines               = []
    globals.lineCounter         = 0
    globals.typingCounter       = 0
    globals.leftText                    = 0
    globals.midText                     = 0
    globals.rightText                   = 0
    globals.pageChange                  = true
}