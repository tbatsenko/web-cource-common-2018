const getSumOfMultiples = function(l, r, num){
    let first = l;
    if(first % num != 0)
        first += (num - (first % num));
    
    let second = r;
    if(second % num != 0)
        second -= (second % num);
    
    if(first > second)
        return 0;
    
    first /= num;
    second /= num;

    let sum = (second * (second + 1)) / 2;
    sum -= ((first - 1) * first) / 2;

    sum *= num;
    return sum;
}

const ans = getSumOfMultiples(1, 999, 3) + getSumOfMultiples(1, 999, 5) - getSumOfMultiples(1, 999, 15);
console.log(ans);
