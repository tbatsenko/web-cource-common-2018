let end = 1000 - 1;
let first = 3;
let second = 5;


function sumArithmeticSequence(first_el) {
  return function(last_el) {
    return function(number_el) {
      if (first_el > last_el) return 0;
      return Math.round((last_el+first_el)*number_el/2);
    };
  };
}

let sumArithmeticSequenceFor1 = sumArithmeticSequence(1);

let numbersDividedBy3 = Math.floor(end/first);
let sumFor3 = sumArithmeticSequenceFor1(numbersDividedBy3)(numbersDividedBy3) * first;
let numbersDividedBy5 =  Math.floor(end/second);
let sumFor5 = sumArithmeticSequenceFor1(numbersDividedBy5)(numbersDividedBy5) * second;


let numbersDividedBy15 =  Math.floor(end/(second*first));
let sumFor15 = sumArithmeticSequenceFor1(numbersDividedBy15)(numbersDividedBy15) * second * first;
console.log("Answer to first task: ")
console.log(sumFor3+sumFor5-sumFor15);