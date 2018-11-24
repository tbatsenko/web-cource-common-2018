const squareOfSum = x => Math.pow((x * (x + 1)) / 2, 2);
const sumOfSquares = x => (x * (x + 1) * (2 * x + 1)) / 6;

const kN = 100;

console.log(squareOfSum(kN) - sumOfSquares(kN));