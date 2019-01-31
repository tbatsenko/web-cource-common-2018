export default function deepcopy2DArray(array) {
    return array.slice().map(innerArray => innerArray.slice())
}