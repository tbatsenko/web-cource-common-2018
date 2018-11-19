/**
 * Bubble Sort
 * Best: O(n ^ 2) Average: O(n ^ 2) Worst: O(n ^ 2)
 * 
 * @param {number[]} array 
 */
function bubbleSort(array) {
  let len = array.length;
  for (let i = len - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (array[j - 1] > array[j]) {
        let temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}

/**
 * Selection sort
 * Best: O(n ^ 2) Average: O(n ^ 2) Worst: O(n ^ 2)
 * 
 * @param {number[]} array 
 */
function selectionSort(array) {
  let minIdx, temp;
  const len = array.length;
  for (let i = 0; i < len; i++) {
    minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    temp = array[i];
    array[i] = array[minIdx];
    array[minIdx] = temp;
  }
  return array;
}


/**
 * Insertion Sort
 * Best: O(n)     Average: O(n ^ 2)     Worst: O(n ^ 2)
 *   
 * @param {number[]} array 
 */
function insertionSort(array) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    let j = i - 1;
    for (j; j > -1 && array[j] > value; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = value;
  }

  return array;
}

/**
 * Merge Sort
 * Best: O(n log(n)) Average: O(n log(n)) Worst: O(n log(n))
 * 
 * @param {number[]} array
 */
function mergeSort(array) {
  let len = array.length;
  if (len < 2)
    return array;
  let mid = Math.floor(len / 2),
    left = array.slice(0, mid),
    right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [],
    lLen = left.length,
    rLen = right.length,
    l = 0,
    r = 0;
  while (l < lLen && r < rLen) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }
  return result.concat(left.slice(l)).concat(right.slice(r));
}

const testArray = [48, 12, 63, 2211, 363, 4, 99, 51, 7];

/** This uses two new(1) built in methods String.Prototype.padStart
 *  and String.Prototype.padEnd were introduced in ES2017 (ES8)
 *  which perform the required padding functions.
 * (1) node >= 8.2.1 (or >= 7.5.0 if run with the --harmony flag)
 */
console.log('Bubble Sort: '.padEnd(16), bubbleSort(testArray));
console.log('Selection Sort: '.padEnd(16), selectionSort(testArray));
console.log('Insertion sort: '.padEnd(16), insertionSort(testArray));
console.log('Merge sort: '.padEnd(16), mergeSort(testArray));