const kN = 1000000;
const prime = Array(kN + 1).fill(true);

prime[1] = false;
for(let i = 2; i <= kN; ++i){
    if(!prime[i])
        continue;
    for(let j = i * i; j <= kN; j += i)
        prime[j] = false;
}

let val;
let counter = 0;

for(let i = 1; i <= kN; ++i)
    if(prime[i] && (++counter == 10001)){
        val = i;
        break;
    }

console.log(val);