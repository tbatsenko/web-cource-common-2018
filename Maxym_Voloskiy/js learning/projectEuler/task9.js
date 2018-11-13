// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

(function task9() {
    var a = 1;
    var b = a + 1;
    var c;

    while (a < 1000){
        while (b < 1000){
            c = 1000 - a - b;
            if (c < b){
                break;
            }
            if (Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)){
                console.log(a * b *c);
                return a * b * c;
            }
            b++;
        }
        a++;
        b = a + 1;
    }
}());