(function task2(n) {
    var fib = [1, 2];
    var sum = 0;

    function calc(arr) {
        return arr[arr.length - 1] + arr[arr.length - 2]
    }
    
    while (fib[fib.length - 1] < n){
        fib.push(calc(fib));
    }

    fib.forEach(function (n) {
        (n%2 === 0) ? sum += n:0;
    });

    console.log(sum);
    return sum;
}(4000000));
