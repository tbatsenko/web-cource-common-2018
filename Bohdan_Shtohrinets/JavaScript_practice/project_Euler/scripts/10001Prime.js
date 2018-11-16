const isPrime = (number) => {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) return false
    }
    return true
};

const getPrime = (index) => {
    let primes = [2];
    let n = 3;
    while (primes.length < index) {
        if (isPrime(n)) primes.push(n);
        n += 2;
    }

    return primes[primes.length - 1];
};

console.log(getPrime(10001));