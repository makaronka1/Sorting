const arr = [-1, 2, 3, 4, -5, 6, 7, -8, 9, -1];
function mergeSort (array) {
  if (array.length <= 1) return array;

  const leftPart = array.slice(0, Math.floor(array.length / 2));
  const rightPart = array.slice(Math.floor(array.length / 2));
  
  const sortedLeft = mergeSort(leftPart);
  const sortedRight = mergeSort(rightPart);

  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }
    
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }
    
    return result;
}

console.log(mergeSort(arr));