import globals from "./globals.js"



export default function detectCollisions(){
    for (let i = 1; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        detectCollisionBetweenPlayerAndSprite(sprite)
    }
}

function detectCollisionBetweenPlayerAndSprite(sprite){
    //Reset collision state
    sprite.isCollidingWithPlayer = false;

    if (sprite.hitBox) {
        
        //Player Sprite
        const player = globals.sprites[0]
        
        //Player DATA
        const x1 = player.xPos + player.hitBox.xOffset
        const y1 = player.yPos + player.hitBox.yOffset
        const w1 = player.hitBox.xSize
        const h1 = player.hitBox.ySize
    
        //Compared Sprite DATA
        const x2 = sprite.xPos + sprite.hitBox.xOffset
        const y2 = sprite.yPos + sprite.hitBox.yOffset
        const w2 = sprite.hitBox.xSize
        const h2 = sprite.hitBox.ySize
    
        const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
        if (isOverlap) {
            
            sprite.isCollidingWithPlayer = true 
        }
    }
    
}

function rectIntersect(x1,y1,w1,h1,
                       x2,y2,w2,h2){
    let isOverlap
    if (x2 > w1 + x1 ||
        x1 > w2 + x2 ||
        y2 > h1 + y1 ||
        y1 > h2 + y2   
       ) {
        isOverlap = false
    } else {
        isOverlap = true
    }
    return isOverlap
}