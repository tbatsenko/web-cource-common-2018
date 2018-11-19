const pythagoreanTriplet = () => {
    let a = 1;
    let b = a + 1;
    let c;

    while (a < 1000) {
        while (b < 1000 && b > a) {
            c = 1000 - b - a;
            if (c < b) break;
            if (a ** 2 + b ** 2 === c ** 2) return a * b * c;

            b++
        }
        a++;
        b = a + 1
    }
};

console.log(pythagoreanTriplet());