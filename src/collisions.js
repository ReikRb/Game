import globals from "./globals.js"
import {Block, State, Obstacle} from "./constants.js"


export default function detectCollisions(){
    for (let i = 1; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        detectCollisionBetweenPlayerAndSprite(sprite)
    }
    detectCollisionBetweenPlayerAndMapObstacles()
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

function detectCollisionBetweenPlayerAndMapObstacles() {
    const player = globals.sprites[0]

    player.isCollidingWithObstacleOnTop    = false
    player.isCollidingWithObstacleOnLeft   = false
    player.isCollidingWithObstacleOnBottom = false
    player.isCollidingWithObstacleOnRight  = false

    let xPos
    let yPos
    let isCollidingOnPos1
    let isCollidingOnPos2
    let isCollidingOnPos3
    let isCollidingOnPos4
    let isCollidingOnPos5
    let isCollidingOnPos6
    let isCollidingOnPos7
    let isCollidingOnPos8
    let isColliding
    let overlap


    // Collision  Checks
    // 6----7----1
    // |---------|
    // |---------|
    // |---------|
    // 5---------2
    // |---------|
    // |---------|
    // |---------|
    // 4----8----3
    const brickSize = globals.level.imageSet.gridSize
    const direction = player.state


    let overlapX
    let overlapY

    if (player.physics.vx >= 0) {
        // Punto 6
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop    = true

        }

        // Punto 4
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))
        // console.log(isCollidingOnPos4);
        if (isCollidingOnPos4) {
            overlapY = Math.floor(yPos) % brickSize + 1
            player.yPos -= overlapY
            player.isCollidingWithObstacleOnBottom = true
            player.physics.vy = 0
        }

        // Punto 7
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize/2);
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos7 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos7) {
            overlapY = Math.floor(yPos) % brickSize
            player.yPos -= overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnBottom = true
        }

             // Punto 8
             xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize/2);
             yPos = player.yPos + player.hitBox.yOffset -1;
             isCollidingOnPos8 = isCollidingWithObstacleAt(xPos, (yPos))
             if (isCollidingOnPos8) {
                 overlapY = brickSize - Math.floor(yPos) % brickSize
                 player.yPos += overlapY
                 player.physics.vy = 0
                 player.isCollidingWithObstacleOnTop = true
             }

        // Punto 2
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize +1
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - brickSize 
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos2) {
            overlapX = Math.floor(xPos) % brickSize + 1
            player.xPos -= overlapX
            player.isCollidingWithObstacleOnRight = true
            
        }

        //Punto 1
        xPos = player.xPos + player.hitBox.xOffset + 1
        yPos = player.yPos + player.hitBox.yOffset - 1
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos)
        if (isCollidingOnPos1) {
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.isCollidingWithObstacleOnTop = true
            
            if (overlapX <= overlapY) {
                player.xPos -= overlapX
                player.physics.vx = 0
            } else {
                if (player.physics.vy > 0) {
                    player.yPos -= overlapY
                } else {
                    player.yPos += overlapY
                    player.physics.vy = 0
                }
            }
        }

        //Punto 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1;
        yPos = player.yPos + player.hitBox.yOffset  + player.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))
        // console.log(isCollidingOnPos3);
        if (isCollidingOnPos3) {
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = Math.floor(yPos) % brickSize 
            player.isCollidingWithObstacleOnBottom = true
            player.physics.vy = 0
            if (overlapX <= overlapY) {
                player.xPos -= overlapX
                player.physics.vx = 0
            } else {
                if (player.physics.vy > 0) {
                    player.yPos -= overlapY
                    player.physics.vy = 0
                }
            }
        }

        if (!player.isCollidingWithObstacleOnBottom) {
            player.physics.isOnGround = false
        }else {
            player.physics.isOnGround = true
        }
    } else if (player.physics.vx <= 0) {
        //Punto 1
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize;
        yPos = player.yPos + player.hitBox.yOffset;

        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos1) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop    = true

        }

        //Punto 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))
        // console.log(isCollidingOnPos3);
        if (isCollidingOnPos3) {
            overlapY = Math.floor(yPos) % brickSize + 1
            player.yPos -= overlapY
            player.isCollidingWithObstacleOnBottom = true
            player.physics.vy = 0
        }
        // Punto 7
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize/2);
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos7 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos7) {
            overlapY = Math.floor(yPos) % brickSize
            player.yPos -= overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnBottom = true
        }

             // Punto 8
             xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize/2);
             yPos = player.yPos + player.hitBox.yOffset -1;
             isCollidingOnPos8 = isCollidingWithObstacleAt(xPos, (yPos))
             if (isCollidingOnPos8) {
                 overlapY = brickSize - Math.floor(yPos) % brickSize
                 player.yPos += overlapY
                 player.physics.vy = 0
                 player.isCollidingWithObstacleOnTop = true
             }
        // Punto 5
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - brickSize 
        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos5) {
            overlapX = Math.floor(xPos) % brickSize + 1
            player.xPos += overlapX
            player.isCollidingWithObstacleOnLeft = true
        }

        //Punto 6
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset - 1
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.isCollidingWithObstacleOnTop = true
        
            if (overlapX <= overlapY) {
                player.xPos += overlapX
                player.physics.vx = 0
            } else {
                if (player.physics.vy > 0) {
                    player.yPos -= overlapY
                } else {
                    player.yPos += overlapY
                    player.physics.vy = 0
                }
            }
        }

                //Punto 4
                xPos = player.xPos + player.hitBox.xOffset - 1;
                yPos = player.yPos + player.hitBox.yOffset  + player.hitBox.ySize + 1;
                isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))
                
                if (isCollidingOnPos4) {
                    overlapX = brickSize - (Math.floor(xPos) % brickSize + 1);
                    console.log(overlapX);
                    overlapY = Math.floor(yPos) % brickSize 
                    player.isCollidingWithObstacleOnBottom = true
                    player.physics.vy = 0
                    if (overlapX <= overlapY) {
                        player.xPos += overlapX
                        player.physics.vx = 0
                    } else {
                        if (player.physics.vy > 0) {
                            player.yPos -= overlapY
                        } 
                    }
                }

        if (!player.isCollidingWithObstacleOnBottom) {
            player.physics.isOnGround = false
        }else {
            player.physics.isOnGround = true
        }
    }
    }
        
      
     


    // switch (direction) {
    //     case State.RUN_RIGHT:
    //         xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize -1
    //         yPos = player.yPos + player.hitBox.yOffset
    //         isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, )

    //         yPos = player.yPos + player.hitBox.yOffset + brickSize
    //         isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, )

    //         yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1
    //         isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, )

    //         isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3

    //         if (isColliding) {
    //             player.isCollidingWithObstacleOnRight = true
    //             overlap = Math.floor(xPos) % brickSize + 1
    //             player.xPos -= overlap
    //         }

    //         break;
    
    //     default:
    //         break;
    // }


function isCollidingWithObstacleAt(xPos, yPos) {
    let isColliding = false

    const id = getMapTileId(xPos, yPos)
    for (const ID in Obstacle){
        if (Obstacle[ID] === id) {
            isColliding = true
            break;
        }
    }

    return isColliding 

}

function getMapTileId(xPos, yPos) {
    const brickSize = globals.level.imageSet.gridSize
    const levelData = globals.level.data

    const fil = Math.floor((yPos) / brickSize)
    const col = Math.floor(xPos / brickSize)


    let id = levelData[fil][col]


    return id
    
}