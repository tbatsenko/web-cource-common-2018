const largestPrimeFactor = (target) => {
    let i = 2;
    while (i < target) {
        while (target % i === 0) {
            ((new_target) => {
                target = new_target;
            })(target / i);
        }
        i++;
    }
    return target
};

console.log(largestPrimeFactor(600851475143));