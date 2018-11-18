// ~~~~~~~~ Euler Project #1 ~~~~~~~~~~
//const range = Array(999).fill().map((e,i) =>i+1);
// let take = range.filter(el => el%5 === 0 || el%3 === 0);
// let sum = take.reduce((acc, cur) => acc + cur, 0);
const sum01 = Array(12).fill().map(e => Array(9).fill().map(function(e, i) {return i} ));
    // .fill()
    // .map((e, i) => i + 1)
    // .filter(el => el % 5 === 0 || el % 3 === 0)
    // .reduce((acc, cur) => acc + cur, 0);

console.log("Euler#1 = " + sum01);
// 3(n(n+1))/2

let n = 9999;
const firstNumber = 2;
const secondNumber = 7;
const commonNumber = firstNumber * secondNumber;

const sumOfArithmeticProgression = (A0, An, n) => (A0 + An) * n / 2;

const sumOfFirstNElements = (a, n) => {
    const numberOfElements = Math.floor(n/a);
    return sumOfArithmeticProgression(a, numberOfElements*a, numberOfElements)
};

sumOfFirstNElements(firstNumber, n)
+ sumOfFirstNElements(secondNumber, n)
- sumOfFirstNElements(commonNumber, n)

console.log(sum01);



