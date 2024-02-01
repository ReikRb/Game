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


function sortHighScores(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {

            if (array[j]['id'] > array[j + 1]['id']) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

