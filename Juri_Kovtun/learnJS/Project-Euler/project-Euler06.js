// ~~~~~~~~ Euler Project #6 ~~~~~~~~~~

let n = 100;
let Sum_of_Sq = 0;
for (let i = 1; i <= n; i++) {
    Sum_of_Sq += i ** 2;
}
let Sq_of_Sum = (n * (n + 1) / 2) ** 2;
console.log(Sq_of_Sum - Sum_of_Sq);