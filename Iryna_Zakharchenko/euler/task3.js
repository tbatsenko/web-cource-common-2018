function findGreatestPrimeDivider(num){
    let max_prime = -1

    while (num % 2 === 0){
        max_prime = 2
        num  /= 2
    }

    let root = Math.ceil(Math.sqrt(num)) + 1

    for (let i = 3; i < root; i += 2){
        while (num % i === 0){
            num /= i
            max_prime = i

        }

    }

    return max_prime
}




let input_num = 600851475143;
console.log("Answer to third task: ")
console.log(findGreatestPrimeDivider(input_num))