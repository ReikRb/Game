import globals from "./globals.js"
import { Block, State, Obstacle, SpriteId } from "./constants.js"


export default function detectCollisions() {
    for (let i = 1; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        detectCollisionBetweenPlayerAndSprite(sprite)
        if (sprite.id === 1) {
            detectCollisionBetweenSkeletonAndMapObstacles(sprite)
        }
    }
    detectCollisionBetweenPlayerAndMapObstacles()
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
                const feet = Math.floor(player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 5);
                let top = Math.floor(sprite.yPos + sprite.hitBox.yOffset + 9)
                if (isOverlap) {
                    let result = false
                    for (let i = 0; i < globals.platforms.length; i++) {
                        if (feet <= top && player.physics.isOnPlatform) {
                            result = true
                            break;
                        }
                    }
                    player.physics.isOnPlatform = result
                    player.physics.isOnGround = result

                    if (player.physics.vy > 0 && feet <= (top) || player.physics.isOnPlatform) {
                        player.yPos = sprite.yPos - player.hitBox.yOffset - player.hitBox.ySize + 1
                        player.physics.vy = 0
                        player.physics.isOnGround = true
                        player.physics.isOnPlatform = true
                    }
                }
                if (!player.physics.isOnPlatform) {
                    player.physics.isOnGround = false
                }



                break;

            default:
                break;
        }
    }
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
function detectCollisionBetweenSkeletonAndMapObstacles(sprite) {
    const skeleton = globals.sprites[1]
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
    const direction = skeleton.state

    if (skeleton.physics.vx > 0) {
        // Punto 6
        xPos = skeleton.xPos + skeleton.hitBox.xOffset;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
            swapDirection(skeleton)

        }

        // Punto 4
        xPos = skeleton.xPos + skeleton.hitBox.xOffset;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize + 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos4) {
            overlapY = Math.floor(yPos) % brickSize + 1
            skeleton.yPos -= overlapY
            skeleton.isCollidingWithObstacleOnBottom = true
            skeleton.physics.vy = 0
        }


        // Punto 2
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize + 1
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize - Math.ceil(skeleton.hitBox.ySize / 2)
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos2) {
            swapDirection(skeleton)

        }

        //Punto 1
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize + 1
        yPos = skeleton.yPos + skeleton.hitBox.yOffset - 1
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos)
        if (isCollidingOnPos1) {
            swapDirection(skeleton)
        }

        //Punto 3
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize + 1;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))


        if (isCollidingOnPos3) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1;
            overlapY = Math.floor(yPos) % brickSize

            if (overlapX <= overlapY) {
                swapDirection(skeleton)
            }
        }



    } else if (skeleton.physics.vx < 0) {


        //Punto 3
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos3) {
            overlapY = Math.floor(yPos) % brickSize + 1
            skeleton.yPos -= overlapY
            skeleton.physics.vy = 0
        }


        // Punto 5
        xPos = skeleton.xPos + skeleton.hitBox.xOffset - 1
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + Math.ceil(skeleton.hitBox.ySize / 2)
        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos5) {
            swapDirection(skeleton)
        }

        //Punto 6
        xPos = skeleton.xPos + skeleton.hitBox.xOffset - 1
        yPos = skeleton.yPos + skeleton.hitBox.yOffset - 1
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
            swapDirection(skeleton)
        }

        //Punto 4
        xPos = skeleton.xPos + skeleton.hitBox.xOffset - 1;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize + 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos)


        if (isCollidingOnPos4) {
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = Math.floor(yPos) % brickSize

            if (overlapX <= overlapY) {
                swapDirection(skeleton)
            }
            if (skeleton.physics.vy > 0) {
                skeleton.yPos -= overlapY
            }

        }



    } else {
        // Punto 4
        xPos = skeleton.xPos + skeleton.hitBox.xOffset;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize + 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos4) {
            overlapY = Math.floor(yPos) % brickSize + 1
            skeleton.yPos -= overlapY
            skeleton.isCollidingWithObstacleOnBottom = true
            skeleton.physics.vy = 0
        }

        //Punto 3
        xPos = skeleton.xPos + skeleton.hitBox.xOffset + skeleton.hitBox.xSize + 1;
        yPos = skeleton.yPos + skeleton.hitBox.yOffset + skeleton.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))


        if (isCollidingOnPos3) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1;
            overlapY = Math.floor(yPos) % brickSize

            if (overlapX <= overlapY) {
                swapDirection(skeleton)
            }
        }
    }
    if (isCollision) {
        swapDirection(skeleton)
    }
}
function swapDirection(skeleton) {
    skeleton.state = skeleton.state === State.RUN_RIGHT_2 ? State.RUN_LEFT_2 : State.RUN_RIGHT_2
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
    let isColliding
    let overlap


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
        // Punto 6
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop = true

        }

        // Punto 4
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos4) {
            overlapY = Math.floor(yPos) % brickSize + 1
            player.yPos -= overlapY
            player.isCollidingWithObstacleOnBottom = true
            player.physics.vy = 0
        }

        // Punto 8
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset - 1;
        isCollidingOnPos8 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos8) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop = true
        }

        // Punto 7
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 2;
        isCollidingOnPos7 = isCollidingWithObstacleAt(xPos, yPos)
        if (isCollidingOnPos7) {
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

        // Punto 9
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - Math.ceil(player.hitBox.ySize / 3)
        isCollidingOnPos9 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos9) {
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

        //Punto 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 2;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos3) {
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = Math.floor(yPos) % brickSize
            player.isCollidingWithObstacleOnBottom = true

            if (overlapX <= overlapY) {
                player.xPos -= overlapX

            }
            if (player.physics.vy > 0) {
                player.yPos -= overlapY

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

        //Punto 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, (yPos))

        if (isCollidingOnPos3) {
            overlapY = Math.floor(yPos) % brickSize + 1
            player.yPos -= overlapY
            player.isCollidingWithObstacleOnBottom = true
            player.physics.vy = 0
        }
        // Punto 8
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset - 1;
        isCollidingOnPos8 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos8) {
            overlapY = brickSize - Math.floor(yPos) % brickSize
            player.yPos += overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnTop = true
        }
        // Punto 7
        xPos = player.xPos + player.hitBox.xOffset + (player.hitBox.xSize / 2);
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 2;
        isCollidingOnPos7 = isCollidingWithObstacleAt(xPos, (yPos))
        if (isCollidingOnPos7) {
            overlapY = Math.floor(yPos) % brickSize
            player.yPos -= overlapY
            player.physics.vy = 0
            player.isCollidingWithObstacleOnBottom = true
        }


        // Punto 5
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset + Math.ceil(player.hitBox.ySize / 3)
        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos5) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1
            player.xPos += overlapX
            player.isCollidingWithObstacleOnLeft = true
        }

        // Punto 10
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - Math.ceil(player.hitBox.ySize / 3)
        isCollidingOnPos10 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos10) {
            overlapX = brickSize - Math.floor(xPos) % brickSize + 1
            player.xPos += overlapX
            player.isCollidingWithObstacleOnLeft = true
        }

        //Punto 6
        xPos = player.xPos + player.hitBox.xOffset - 1
        yPos = player.yPos + player.hitBox.yOffset - 1
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos6) {
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

        //Punto 4
        xPos = player.xPos + player.hitBox.xOffset - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 2;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos)

        if (isCollidingOnPos4) {
            overlapX = brickSize - (Math.floor(xPos) % brickSize + 1);
            overlapY = Math.floor(yPos) % brickSize
            player.isCollidingWithObstacleOnBottom = true
            if (overlapX <= overlapY) {
                player.xPos += overlapX

            }
            if (player.physics.vy > 0) {
                player.yPos -= overlapY
            }

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
    const col = Math.floor(xPos / brickSize)

    return levelData[fil][col]

}