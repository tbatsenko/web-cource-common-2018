const numberDivisible = (x, range) => {
    for (let i = 2; i < range + 1; i++) {
        if (x % i !== 0) return false
    }
    return true
};

const smallestMultiple = (numberRange) => {
    let result = numberRange;
    while (true) {
        if (numberDivisible(result, numberRange)) break;
        result += 1;
    }
    return result;
};

console.log(smallestMultiple(20));