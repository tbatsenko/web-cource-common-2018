let prev1 = 1;
let prev2 = 1;
let curr = prev1 + prev2;
let sum = 0;
while(curr <= 4000000){
    if(curr % 2 == 0){
        sum += curr;
    }
    prev1 = prev2;
    prev2 = curr;
    curr = prev1 + prev2;
}
console.log(sum);