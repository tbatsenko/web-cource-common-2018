function theLargestPrimeFactor(number) {
  let currNumber = number;
  for (let currFactor = 2; currFactor <= currNumber; currFactor++) {
    while (currNumber % currFactor === 0 ) {
      currNumber /= currFactor;
    }
    if (currNumber === 1)
      return currFactor;
  }
}

console.log(theLargestPrimeFactor(600851475143));
