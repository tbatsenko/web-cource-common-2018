// What is the 10 001st prime number?

(function getPrimes(max) {

    function isPrime (n)
    {
        if (n < 2) return false;

        var q = Math.floor(Math.sqrt(n));
        for (var i = 2; i <= q; i++)
        {
            if (n % i === 0)
            {
                return false;
            }
        }
        return true;
    }
    
    var primes =[];
    var n = 0;
    
    while (primes.length !== max) {
        if (isPrime(n)){
            primes.push(n)
        }
        n++;
    }

    console.log(primes[primes.length-1]);
    return primes[primes.length-1];
}(10001));