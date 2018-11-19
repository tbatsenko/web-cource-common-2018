function binarySearch(array, target) {
  let startIndex = 0;
  let endIndex = array.length - 1;
  let middleIndex = Math.floor((startIndex + endIndex) / 2);

  while (array[middleIndex] !== target && startIndex < endIndex) {
    if (target < array[middleIndex]) {
      endIndex = middleIndex - 1;
    } else {
      startIndex = middleIndex + 1;
    }

    middleIndex = Math.floor((startIndex + endIndex) / 2);
  }

  return (array[middleIndex] !== target) ? -1 : {
    index: middleIndex,
    tagret: array[middleIndex]
  };
}

console.log(
  'ATTENTION: binary search only works if the input list is sorted in ASCending order!');

const testArray = [1, 2, 8, 11, 29, 33, 45, 87, 92, 110];
const testTagrets = [1, 110, 33, 22];

testTagrets.forEach(target => {
  console.log('Test array: ', testArray);
  console.log('Test target: ', target);
  console.log(binarySearch(testArray, target));
  console.log();
});