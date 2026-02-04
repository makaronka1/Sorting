let array = [120, 25, 17, 34, -7, 4];

async function selectionSort (arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }
  
  let arrCopy = [...arr]
  for (let i = 0; i < arrCopy.length - 1; i++) {
    let slicedArray = arrCopy.slice(i);
    let minValueIndex = getMinValueIndex(slicedArray);

    if (minValueIndex !== 0) {
      [arrCopy[i], arrCopy[minValueIndex + i]] = [arrCopy[minValueIndex + i], arrCopy[i]];
    } else {
      continue;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(arrCopy);
  }
  
  return arrCopy;
}