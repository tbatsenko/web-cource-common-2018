const squareDifference = (sum1, sum2) => sum1 > sum2 ? sum1 - sum2 : sum2 - sum1;

const squareSum = (numbers) => {
    let sumOfSquares = 0;
    let squareOfSum = 0;

    numbers.forEach((number) => {
        sumOfSquares += number ** 2;
        squareOfSum += number;
    });

    return squareDifference(sumOfSquares, squareOfSum ** 2);
};

let number_range = 100;
let arr = Array.apply(null, {length: number_range + 1}).map(Number.call, Number);
arr.shift();

console.log(squareSum(arr));