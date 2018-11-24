const fibos = [1, 2];

while(fibos[fibos.length - 1] < 4000000)
    fibos.push(fibos[fibos.length - 1] + fibos[fibos.length - 2]);
if(fibos[fibos.length - 1] >= 4000000)
    fibos.pop();

let sum = 0;
for(let entry of fibos)
    if(entry % 2 == 0)
        sum += entry;

console.log(sum);