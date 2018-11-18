// Find the sum of all the primes below two million.

(function task10(n) {

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

    var i = 0;
    var sum = 0;
    while (i <= n){
        if (isPrime(i)){
            sum += i;
        }
        ++i;
    }

    console.log(sum);
    return sum;
}(2000000));