import globals from "./globals.js"
import { Block, State, Obstacle, SpriteId } from "./constants.js"


export default function detectCollisions() {
    for (let i = 1; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        detectCollisionBetweenPlayerAndSprite(sprite)
        if (sprite.id === SpriteId.SKELETON) {
            detectCollisionBetweenSkeletonAndMapObstacles(sprite)
            detectCollisionBetweenSkeletonAndSprite(sprite)
        } else if (sprite.id === SpriteId.FIREBALL) {
            detectCollisionBetweenFireballAndMapObstacles(sprite)
        }
    }
    detectCollisionBetweenPlayerAndMapObstacles()
}
function detectCollisionBetweenFireballAndMapObstacles(sprite) {
    let xPos
    let yPos
    let isCollidingOnPos1
    let isCollidingOnPos2
    let isCollidingOnPos3
    let isCollidingOnPos4

    // Collision  Checks
    // 4---------1
    // |---------|
    // |---------|
    // 3---------2

    if (sprite.state === State.RIGHT) {
        //Punto 1
        xPos = sprite.xPos + sprite.hitBox.xOffset + sprite.hitBox.xSize + 1
        yPos = sprite.yPos + sprite.hitBox.yOffset
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos)
        if (isCollidingOnPos1) {
            sprite.isColliding = true
        }

        //Punto 2
        xPos = sprite.xPos + sprite.hitBox.xOffset + sprite.hitBox.xSize + 1;
        yPos = sprite.yPos + sprite.hitBox.yOffset + sprite.hitBox.ySize;
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos2) {
            sprite.isColliding = true
        }
    } else {
        // Punto 4
        xPos = sprite.xPos + sprite.hitBox.xOffset;
        yPos = sprite.yPos + sprite.hitBox.yOffset;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos4) {
            sprite.isColliding = true
        }

        // Punto 3
        xPos = sprite.xPos + sprite.hitBox.xOffset;
        yPos = sprite.yPos + sprite.hitBox.yOffset + sprite.hitBox.ySize;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos3) {
            sprite.isColliding = true
        }

    }

}

function detectCollisionBetweenPlayerAndSprite(sprite) {
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
        switch (sprite.id) {
            case SpriteId.PLATFORM:
                const feet = Math.floor(player.yPos + player.hitBox.yOffset + player.hitBox.ySize );
                let bot = Math.floor(sprite.yPos + sprite.hitBox.yOffset + sprite.hitBox.ySize)
                if (isOverlap) {
                    let result = false
                    
                        if (feet <= bot && player.physics.isOnPlatform) {
                            result = true
                        }
                    
                    player.physics.isOnPlatform = result
                    player.physics.isOnGround = result

                    if (player.physics.vy > 0 && feet <= (bot) || player.physics.isOnPlatform) {
                        player.yPos = sprite.yPos - player.hitBox.yOffset - player.hitBox.ySize -1
                        player.physics.vy = 0
                        player.physics.isOnGround = true
                        player.physics.isOnPlatform = true
                    }
                }
                if (!player.physics.isOnPlatform) {
                    player.physics.isOnGround = false
                }



                break;

            case SpriteId.CHECKPOINT:
                if (sprite.isCollidingWithPlayer && !sprite.used) {
                    globals.life += 20
                    globals.levelTime.value += 50
                    sprite.used = true
                }
                break;
            
            case SpriteId.KEY:
                if (sprite.isCollidingWithPlayer) {
                    globals.key = true
                }
                break;

            case SpriteId.POWER:
                if (isOverlap) {
                    globals.power = true
                }
                break;

            case SpriteId.MANACRYSTAL:
                if (isOverlap) {
                    globals.levelTime.value += 30
   
                }
                break;

            case SpriteId.DOOR:
                let overlapX

                if (sprite.isCollidingWithPlayer) {
                    if (player.physics.vx >0) {
                        let xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize
                        overlapX = Math.floor(xPos) % sprite.hitBox.xSize + 1
                        player.xPos -= overlapX

                    } else if (player.physics.vx < 0) {
                        let xPos = player.xPos + player.hitBox.xOffset - 1
                        overlapX = sprite.hitBox.xSize - Math.floor(xPos) % sprite.hitBox.xSize + 1
                        player.xPos += overlapX
                    }
                }
                break;
        
            case SpriteId.SPIKE:
                
                if (isOverlap) {
                    globals.life = 0 
                }
                break;
        }
    }
}

function detectCollisionBetweenPlayerAndMapObstacles() {
    const player = globals.sprites[0]

    player.isCollidingWithObstacleOnTop = false
    player.isCollidingWithObstacleOnLeft = false
    player.isCollidingWithObstacleOnBottom = false
    player.isCollidingWithObstacleOnRight = false

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
    let isCollidingOnPos9
    let isCollidingOnPos10
    // let isColliding
    // let overlap


    // Collision  Checks
    // 6----8----1
    // |---------|
    // |---------|
    // 5---------2
    // |---------|
    // |---------|
    // 10--------9
    // |---------|
    // |---------|
    // 4----7----3
    const brickSize = globals.level.imageSet.gridSize
    const direction = player.state


    let overlapX
    let overlapY

    if (player.physics.vx >= 0) {
        // Punto 9
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos9 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos9) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop = true

        }

        // Punto 6
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos6) {
            overlapY = Math.floor(yPos) % brickSize
            player.yPos -= overlapY
            player.isCollidingWithObstacleOnBottom = true
            player.physics.vy = 0
        }

        // Punto 10
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset - 1;
        isCollidingOnPos10 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos10) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop = true
        }

        // Punto 5
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos)
        if (isCollidingOnPos5) {
            overlapY = Math.floor(yPos) % brickSize
            player.yPos -= overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnBottom = true
        }



        // Punto 2
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1
        yPos = player.yPos + player.hitBox.yOffset + Math.ceil(player.hitBox.ySize / 3)
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos2) {
            overlapX = Math.floor(xPos) % brickSize + 1
            player.xPos -= overlapX
            player.isCollidingWithObstacleOnRight = true

        }

        // Punto 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - Math.ceil(player.hitBox.ySize / 3)
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos3) {
            overlapX = Math.floor(xPos) % brickSize + 1
            player.xPos -= overlapX
            player.isCollidingWithObstacleOnRight = true

        }

        //Punto 1
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1
        yPos = player.yPos + player.hitBox.yOffset - 1
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos)
        if (isCollidingOnPos1) {
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.isCollidingWithObstacleOnTop = true

            if (overlapX <= overlapY) {
                player.xPos -= overlapX

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
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos4) {
            overlapX = Math.floor(xPos) % brickSize;
            overlapY = Math.floor(yPos) % brickSize
            player.isCollidingWithObstacleOnBottom = true

            if (overlapX <= overlapY) {
                player.xPos -= overlapX

            }
            if (player.physics.vy > 0) {
                player.yPos -= overlapY
                player.physics.vy = 0
            }

        }



    } else if (player.physics.vx < 0) {
        //Punto 1
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize;
        yPos = player.yPos + player.hitBox.yOffset;

        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos1) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop = true

        }

        //Punto 4
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize -1
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos4) {
            overlapY = Math.floor(yPos) % brickSize
            player.yPos -= overlapY
            player.isCollidingWithObstacleOnBottom = true
            player.physics.vy = 0
        }
        // Punto 10
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset - 1;
        isCollidingOnPos10 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos10) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop = true
        }
        // Punto 5
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos5) {
            overlapY = Math.floor(yPos) % brickSize
            player.yPos -= overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnBottom = true
        }


        // Punto 8
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset + Math.ceil(player.hitBox.ySize / 3)
        isCollidingOnPos8 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos8) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1
            player.xPos += overlapX
            player.isCollidingWithObstacleOnLeft = true
        }

        // Punto 7
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - Math.ceil(player.hitBox.ySize / 3)
        isCollidingOnPos7 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos7) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1
            player.xPos += overlapX
            player.isCollidingWithObstacleOnLeft = true
        }

        //Punto 9
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset - 1
        isCollidingOnPos9 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos9) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1;
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

        //Punto 6
        xPos = player.xPos + player.hitBox.xOffset - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
            overlapX = brickSize - (Math.floor(xPos) % brickSize + 1);
            overlapY = Math.floor(yPos) % brickSize
            player.isCollidingWithObstacleOnBottom = true
            if (overlapX <= overlapY) {
                player.xPos += overlapX

            }
            if (player.physics.vy > 0) {
                player.yPos -= overlapY
                player.physics.vy = 0
            }

        }


    }

}

function detectCollisionBetweenSkeletonAndSprite(sprite) {
    //Skeleton DATA
    const x1 = sprite.xPos + sprite.hitBox.xOffset
    const y1 = sprite.yPos + sprite.hitBox.yOffset
    const w1 = sprite.hitBox.xSize
    const h1 = sprite.hitBox.ySize
    //Compared Sprite DATA
    for (let i = 0; i < globals.shoots.length; i++) {
        const fireball = globals.shoots[i];
        const x2 = fireball.xPos + fireball.hitBox.xOffset
        const y2 = fireball.yPos + fireball.hitBox.yOffset
        const w2 = fireball.hitBox.xSize
        const h2 = fireball.hitBox.ySize

        const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
        if (isOverlap) {
            fireball.isColliding = true
            sprite.life--
            if (sprite.life < 0) {
                sprite.life = 0
            }
        }
    }


}

function detectCollisionBetweenSkeletonAndMapObstacles(sprite) {
    const skeleton = sprite
    const isCollision = skeleton.calculateCollisionWithBorders()


    let xPos
    let yPos
    let isCollidingOnPos1
    let isCollidingOnPos2
    let isCollidingOnPos3
    let isCollidingOnPos4
    let isCollidingOnPos5
    let isCollidingOnPos6

    let overlapX
    let overlapY


    // Collision  Checks
    // 6---------1
    // |---------|
    // |---------|
    // 5---------2
    // |---------|
    // |---------|
    // 4---------3
    const brickSize = globals.level.imageSet.gridSize


    if (skeleton.physics.vx >= 0) {

        // Punto 4
        xPos = skeleton.xPos + skeleton.hitBox.xOffset;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize -1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos4) {
            overlapY = Math.floor(yPos) % brickSize +1
            skeleton.yPos -= overlapY
            skeleton.isCollidingWithObstacleOnBottom = true
            skeleton.physics.vy = 0
        }


        // Punto 2
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize + 2
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize - Math.ceil(skeleton.hitBox.ySize / 2)
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos2) {
           sprite.isCollidingWithObstacleOnRight = true

        }

        //Punto 1
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize + 1
        yPos = skeleton.yPos + skeleton.hitBox.yOffset - 1
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos)
        if (isCollidingOnPos1) {
           sprite.isCollidingWithObstacleOnRight = true
        }

        //Punto 3
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize + 1;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos3) {
            overlapX = Math.floor(xPos) % brickSize+1;
            overlapY = Math.floor(yPos) % brickSize

            if (overlapX < overlapY) {
                skeleton.xPos -= overlapX
               sprite.isCollidingWithObstacleOnRight = true
            } else {
                if (skeleton.physics.vy>0) {
                    overlapY = Math.floor(yPos) % brickSize
                    skeleton.yPos -= overlapY
                    skeleton.isCollidingWithObstacleOnBottom = true
                    skeleton.physics.vy = 0
                    
                }
            }
        }

        if (sprite.isCollidingWithObstacleOnRight) {
            swapDirection(skeleton)
        }


    } else if (skeleton.physics.vx < 0) {
        //Punto 3
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize -1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos3) {
            overlapY = Math.floor(yPos) % brickSize+1
            skeleton.yPos -= overlapY
            skeleton.physics.vy = 0
        }


        // Punto 5
        xPos = skeleton.xPos + skeleton.hitBox.xOffset - 1
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + Math.ceil(skeleton.hitBox.ySize / 2)
        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos5) {
            skeleton.isCollidingWithObstacleOnLeft = true
        }

        //Punto 6
        xPos = skeleton.xPos + skeleton.hitBox.xOffset - 1
        yPos = skeleton.yPos + skeleton.hitBox.yOffset - 1
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
            skeleton.isCollidingWithObstacleOnLeft = true
        }

        //Punto 4
        xPos = skeleton.xPos + skeleton.hitBox.xOffset - 1;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize -1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos)



        if (isCollidingOnPos4) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1;
            overlapY = Math.floor(yPos) % brickSize + 1

            if (overlapX <= overlapY) {
                skeleton.xPos += overlapX
                 skeleton.isCollidingWithObstacleOnLeft = true
                 
            }
            if (skeleton.physics.vy > 0) {
                skeleton.yPos -= overlapY
            }

        }

        if (skeleton.isCollidingWithObstacleOnLeft) {
            swapDirection(skeleton)
        }

    } 

}

function swapDirection(skeleton) {
    skeleton.state = skeleton.state === State.RUN_RIGHT_2 ? State.RUN_LEFT_2 : State.RUN_RIGHT_2
    skeleton.physics.vx*=-1
}

function rectIntersect(x1, y1, w1, h1,
    x2, y2, w2, h2) {
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

function isCollidingWithObstacleAt(xPos, yPos) {
    let isColliding = false

    const id = getMapTileId(xPos, yPos)
    for (const ID in Obstacle) {
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

    const fil = Math.floor(yPos / brickSize)
    if (levelData[fil] === undefined) {
        return 1
    }
    const col = Math.floor(xPos / brickSize)

    return levelData[fil][col]

}