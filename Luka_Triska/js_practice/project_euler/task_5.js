let array_of_20 = [];
let test_number = 2;

for (let i = 2; i <= 20; i++) array_of_20.push(i);

while (true) {
    let arr_of_bools = [];
    for (let num of array_of_20) {
        if ((test_number / num) % 1 === 0) {
            arr_of_bools.push(true);
        } else {
            arr_of_bools.push(false);
            break;
        }
    }
    if (arr_of_bools.includes(false) === false) {
        console.log("Victory: ", test_number);
        break;
    } 
    test_number++;
}