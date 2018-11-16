const multipliers = (arr) => {
    let answerArr = arr.filter((num) => num % 3 === 0 || num % 5 === 0);
    return [answerArr.reduce((sum, current) => sum + current), answerArr];
};

arr = Array.apply(null, {length: 1000}).map(Number.call, Number);
console.log(multipliers(arr));