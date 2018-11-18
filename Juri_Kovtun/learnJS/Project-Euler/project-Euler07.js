// ~~~~~~~~ Euler Project #7 ~~~~~~~~~~
let pSet = [2];
let pMax = 10**2;

function inSet (n) {
    for (let i = 0; i < pSet.length; i++) {
        if (n % pSet[i] !== 0) {
            if (i === pSet.length - 1) {
                pSet.push(n);
            }
        } else {
            break
        }
    }
}

for (let j = 3; j <= pMax; j++) {
    inSet(j)
}

console.log(pSet);
// console.log(pSet[10001]);













