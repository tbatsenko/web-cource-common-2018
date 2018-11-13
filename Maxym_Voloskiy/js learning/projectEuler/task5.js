// What is the smallest positive number that is evenly divisible by all of the
// numbers from 1 to 20?

(function euler005() {
    var n = 0;
    var i = 1;
    var dv = 20;
    var check = false;

    while (check === false) {
        n += dv;

        while (n % i === 0 && i <= dv) {
            if (i === dv) {
                check = true;
            }
            i++;
        }

        i = 1;
    }

    console.log(n);
    return n;
}());