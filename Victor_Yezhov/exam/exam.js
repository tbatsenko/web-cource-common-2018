const add = (a, b) => b ? a + b : (b) => a + b;

console.log(add(5,5));
console.log(add(5)(5));

