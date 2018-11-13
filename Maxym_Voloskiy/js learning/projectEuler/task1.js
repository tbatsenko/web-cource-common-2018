(function task1(n) {
    var sum = 0;
    
    while (n--){
        (n % 3 === 0 || n%5===0) ?  sum += n : 0;
    }
    console.log(sum);
    return sum;
}(1000));
