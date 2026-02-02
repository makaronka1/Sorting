let array = [11, 3, 12, 4, -7, 10, 777, 666, 858];

function bubbleSorting (arr) {
  let isStopped = false;
  while (!isStopped) {
    for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      buffer = arr[i + 1];
      arr[i + 1] = arr[i];
      arr[i] = buffer;
      if (isSorted(arr)) {
        isStopped = true;
      }
    }
   }
  }
  return arr;
}

function isSorted (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true;
}

console.log(bubbleSorting(array));