let num = 600851475143;

let primeFactor = -Infinity;

for(let i = 2; i * i <= num; ++i){
    if(num % i != 0)
        continue;
    primeFactor = Math.max(primeFactor, i);
    while(num % i == 0)
        num /= i;
}
if(num > 1)
    primeFactor = Math.max(primeFactor, num);

console.log(primeFactor);
