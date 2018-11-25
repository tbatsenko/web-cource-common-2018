const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const get2dArray = (n, m, initialValue) => ((new Array(n)).fill(0).map(entry => (new Array(m)).fill(initialValue)))

const getIndexOfDOMNode = (element) => {return Array.from(element.parentNode.children).indexOf(element)}