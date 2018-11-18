// ~~~~~~~~ Euler Project #4 ~~~~~~~~~~

let biggestPalindromic = 0;
let product = 0;
let max = 999;

for (let i = 1; i <= max; i++) {
    for (let j = 1; j <= max; j++ ) {
        product = i * j;
        if (biggestPalindromicValidator(product) === true && biggestPalindromic < product ) {
            biggestPalindromic = product;
            console.log(biggestPalindromic);
        }
    }
}

function biggestPalindromicValidator (n) {
    let s = n.toString();
    return s[0] === s[5] && s[1] === s[4] && s[2] === s[3];

}


