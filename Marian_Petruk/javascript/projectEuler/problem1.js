console.log(" == Multiplies of 3 and 5 == ");
console.log("Problem 1\n");
console.log("If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.\n");

var res = 0;

for (let i = 1; i < 1000; ++i) {
    let i_str = i.toString();
    let test_for_three = i_str.split('').map(Number).reduce(function (a, b) {
        return a + b;
    }, 0);
    if (test_for_three % 3 === 0 || (i_str.charAt(i_str.length - 1) === '5' || i_str.charAt(i_str.length - 1) === '0')) {
        res += i;
    }
}

console.log("The sum of all the multiples of 3 or 5 below 1000 is " + res);
