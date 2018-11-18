const sumOfPrimes = (range) => {
    let primes = [2];
    for (let i = 3; i < range + 1; i++) {
        for (let p = 0; p < primes.length; p++) {
            if (i % primes[p] === 0) break; //if prime divides i - stop
            if (i < primes[p] * primes[p]) { // if p > sqrt(i) - mark i as prime
                primes.push(i);
                break
            }
        }
    }
    return primes.reduce((a, b) => a + b)
};

console.log(sumOfPrimes(2000000));