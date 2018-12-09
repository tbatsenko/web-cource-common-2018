function isPalindrome(number) {
  let reverseNumber = parseInt(number.toString().split('').reverse().join(''));
  return reverseNumber === number;
}

let max = 0
for (let i = 999; i > 99; i--) {
  for (let j = 999; j > 99; j--) {
    let number = i * j;
    if (isPalindrome(number) && number > max) {
      max = number;
    }
  }
}

console.log(max);