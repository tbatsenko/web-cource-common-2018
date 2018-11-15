const isPalindrome = (num) => {
    let palindrome = 0;
    const ORIGINAL_NUMBER = num;

    while (num !== 0) {
        palindrome = palindrome * 10 + num % 10;
        num = num / 10 | 0;
    }

    return ORIGINAL_NUMBER === palindrome
};

const largestPalindrome = () => {
    let result = 0;
    //p*q = 11 (9091a + 910b + 100c) <= 9992
    for (let p = 990; p > 99; p -= 11) {
        for (let q = 999; q > 99; q--) {
            let palindromeProduct = p * q;
            if (result < palindromeProduct && isPalindrome(palindromeProduct)) {
                result = palindromeProduct;
                break;
            } else if (result > palindromeProduct) {
                break;
            }
        }
    }
    return result
};

console.log("largest palindrome: ", largestPalindrome());