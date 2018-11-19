function evenFibonacciNumbers(maxNumber) {
  let sum = 0;
  let i = 1;
  let j = 1;
  for (let current = 0; current < maxNumber; ) {
    if (current % 2 === 0) {
      sum += current;
    }
    i = j;
    j = current;
    current = i + j;
  }
  return sum;
}

console.log(evenFibonacciNumbers(4000000));


function evenFibonacciNumbers1(maxNumber) {
  let sum = 0;
  let i = 1;
  let j = 1;
  let c = i + j;
  while (c < maxNumber) {
    sum += c;
    i = j + c;
    j = c + i;
    c = i + j;
  }
  return sum;
}

console.log(evenFibonacciNumbers1(4000000));