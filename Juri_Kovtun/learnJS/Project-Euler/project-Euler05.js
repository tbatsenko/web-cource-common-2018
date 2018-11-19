// ~~~~~~~~ Euler Project #5 ~~~~~~~~~~
let condition = true;
let i = 2520;
while (condition) {

    for (let j = 2; j <= 20;) {

        if (i % j !== 0) break;

        if (j === 20) {
            console.log("Euler#5 = " + i);
            condition = false;
            break;
        }
        j++;
    }
    i++;
}