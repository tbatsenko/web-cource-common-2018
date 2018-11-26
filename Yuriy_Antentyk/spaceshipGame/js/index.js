setInterval(spawnPackOfStones, config.stoneSpawnTimeDelta)
setInterval(spawnPackOfBullets, config.bulletSpawnTimeDelta)

const isPressed = {}
for(const entry of config.controlKeys)
    isPressed[entry] = false

document.addEventListener("keydown", (ev) => { config.controlKeys.includes(ev.keyCode) ? isPressed[ev.keyCode] = true : undefined})
document.addEventListener("keyup", (ev) => { config.controlKeys.includes(ev.keyCode) ? isPressed[ev.keyCode] = false : undefined})

let score = 0

setInterval(
    () => {
        spaceship.update(isPressed)
        for(const stone of stones)stone.update()
        for(const bullet of bullets)bullet.update()

        let si = 0
        while(si < stones.length){
            if(spaceship.collide(stones[si])){
                alert("YOU LOST!")
                location.reload()
            }
            let wasHit = false
            for(let bi = 0; bi < bullets.length && !wasHit; ++bi)
                if(stones[si].collide(bullets[bi])){
                    wasHit = true
                    bullets[bi].destroy()
                    bullets.splice(bi, 1)
                }
            if(wasHit){
                ++score
                stones[si].destroy()
                stones.splice(si, 1)
                continue
            }
            ++si
        }

        config.scoreView.innerText = String(score)
    },
    config.renderTimeDelta
)

setInterval(
    () => {
        stones = stones.filter((stone) => { return (stone.x > (-stone.radius)) || stone.destroy() })
        bullets = bullets.filter((bullet) => { return (inRange(0, config.fieldWidth, bullet.x) && inRange(0, config.fieldHeight, bullet.y) || bullet.destroy()) })
    },
    config.garbageCollectingTimeDelta
)
