let roof = 4000000;
let fibonacci_list = [1, 2];
let sum = 2;

for (let i = 0; i <= roof; i++) {
    if (i === (fibonacci_list[fibonacci_list.length - 1] + fibonacci_list[fibonacci_list.length - 2])) {
        fibonacci_list.push(i);
        if (i % 2 === 0) {
            sum += i;
        }
    }
}

console.log(sum);
