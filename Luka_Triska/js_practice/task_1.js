const a = 4;
// document.write(" wawdwadd");

let number = 1000;

let sum = 0;
for (let i = 0; i <= number; i++) {

    if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
    }
}

console.log(sum);
// document.write(sum);