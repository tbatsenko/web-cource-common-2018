function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

let roof = 999;
let palindromes = [];


for (let i = 1; i < roof; i++) {
    for (let j = 2; j < roof; j++) {
        if (i < 99 && j < 99) break;
        let temp = i * j;
        let temp_array = temp.toString(10).replace(/\D/g, '0').split('').map(Number);
        let temp_array_reversed = String(temp).split("").reverse().map(Number);
        if (arraysEqual(temp_array, temp_array_reversed)) {
            palindromes.push(temp);
        }
    }
}

console.log(Math.max.apply(null, palindromes));
