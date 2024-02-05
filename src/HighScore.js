import globals from "./globals.js"
import { ScoreWheel } from "./constants.js"


export function createHighScores() {
    for (let i = 0; i < 20; i++) {
        const firstLetter = Math.floor(Math.random()*25)
        const secondLetter = Math.floor(Math.random()*25)
        const thirdLetter = Math.floor(Math.random()*25)
        
        const score = Math.floor(Math.random()*100)*100
    
        const highScore = {
            id: i,
            name: ("" + ScoreWheel[firstLetter] + ScoreWheel[secondLetter] + ScoreWheel[thirdLetter]),
            score: score
    
        }
    
        globals.highScores.push(highScore)
        
    }
    sortHighScores(globals.highScores)
}

export function calculatePositionHighScore() {
    for (let i = 0; i < globals.highScores.length; i++) {
        const highScore = globals.highScores[i];
        if (globals.score > highScore.score) {
            globals.scorePos = i
            break;
        }
        
    }
}
export function sortHighScores() {
    for (let i = 0; i < globals.highScores.length - 1; i++) {
        for (let j = 0; j < globals.highScores.length - 1 - i; j++) {

            if (globals.highScores[j]['score'] < globals.highScores[j + 1]['score']) {
                const temp = globals.highScores[j];
                globals.highScores[j] = globals.highScores[j + 1];
                globals.highScores[j + 1] = temp;
            }
        }
    }
}

