// What is the value of the first triangle number to have over five hundred divisors?

(function task12() {

    function divisiors(x) {

       var rs = 2;

       for (var i=2; i<Math.sqrt(x); ++i){
           x%i===0 ? rs+=2 : 0;
       }

       x%i===0 ? rs++ : 0;

       return rs;
    }

    var x = 1,
        i = 1;
    
    while (divisiors(x) < 500){
        i++;
        x += i;
    }

    console.log(x);
    return x;

}());