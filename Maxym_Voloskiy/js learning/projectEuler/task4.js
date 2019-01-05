// A palindromic number reads the same both ways. The largest palindrome made
// from the product of two 2-digit numbers is 9009 = 91 x 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

(function euler004() {

    var n = 999 * 999; /**/
    var str, str_reversed, sqrt, d;

    while (n > 100000) {

        str = n + '';
        str_reversed = str.split('').reverse().join('');

        if (str === str_reversed) {
            sqrt = Math.sqrt(n);
            d = Math.floor(sqrt);

            while (n % d !== 0 && d >= 100 && n / d <= 999) {
                d--;
            }

            if (n % d === 0 && d >= 100 && n / d <= 999) {
                console.log(n);
                return n;
            }
        }

        n--;
    }
}());