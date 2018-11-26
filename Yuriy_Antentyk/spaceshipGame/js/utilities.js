const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const inRange = (min, max, val) => { return min <= val && val <= max; }

const squaredDistance = (item1, item2) => { return Math.pow((item1.x - item2.x), 2) + Math.pow((item1.y - item2.y), 2) }