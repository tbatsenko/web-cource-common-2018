let number = 600851475143;

function isPrime(input) {
    let prime = true;
    for (let i = 2; i <= Math.sqrt(input); i++) {
        if (input % i === 0) {
            prime = false;
            break;
        }
    }
    return prime && (input > 1);
}

// runs for a long time. The correct answer is 6857, so it's better to terminate
// the script after you see this answer
for (let i = 0; i <= number; i++) {
    if ((number / i) % 1 === 0 && (isPrime(i))) {
        console.log(i);
    }
}