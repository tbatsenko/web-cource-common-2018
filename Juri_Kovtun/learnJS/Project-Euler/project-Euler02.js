// ~~~~~~~~ Euler Project #2 ~~~~~~~~~~
let fibonacci = [1,2];
let i = 2;
while (true) {
    let c = fibonacci[i-2]+fibonacci[i-1];
    if (c < 4000000) {
        fibonacci.push(c);
    } else {
        break;
    }
    i++;

}
const sum02 = fibonacci.filter(el => el%2 === 0).reduce((acc, cur) => acc + cur, 0);

console.log("Euler#2 = " + sum02);