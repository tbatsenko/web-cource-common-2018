const fibonacci = (size) => {
    let fibonacciArr = [1, 2];
    while (fibonacciArr[fibonacciArr.length - 1] < size) {
        fibonacciArr.push(fibonacciArr[fibonacciArr.length - 1] + fibonacciArr[fibonacciArr.length - 2])
    }
    delete fibonacciArr[fibonacciArr.length - 1]; //last is bigger

    return fibonacciArr.filter((x) => x % 2 === 0).reduce((sum, current) => sum + current); // even fibonacci sum
};

console.log(fibonacci(4000000));
