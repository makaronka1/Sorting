let array = [6, 12, 1, -5, 22, -40];

function quickSort (arr) {

  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[arr.length - 1];
  let i = -1;

  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[arr.length - 1]] = [arr[arr.length - 1], arr[i + 1]];
  i++;

  const leftPart = arr.slice(0, i);
  const rightPart = arr.slice(i + 1);


  const sortedLeft = quickSort(leftPart);
  const sortedRight = quickSort(rightPart);
  
  return sortedLeft.concat([pivot]).concat(sortedRight);
}

console.log(quickSort(array));