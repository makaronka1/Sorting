let array = [6, 12, 1, -5, 22, -40, 0];

async function quickSort (arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }

  if (arr.length <= 1) {
    return {
      resultNumber: arr,
      resultContainer: containersArray
    };
  }

  let pivot = arr[arr.length - 1];
  let pivotContainer = containersArray[containersArray.length - 1];
  let i = -1;

  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      highlightContainers([containersArray[i], containersArray[j]], '#2196F3');
      await delay(500);

      [arr[i], arr[j]] = [arr[j], arr[i]];
      [containersArray[i], containersArray[j]] = [containersArray[j], containersArray[i]];
      [containersArray[i].style.left, containersArray[j].style.left] = [containersArray[j].style.left, containersArray[i].style.left];

      await delay(500);
      highlightContainers([containersArray[i], containersArray[j]], '#4CAF50');
    }
  }

  [arr[i + 1], arr[arr.length - 1]] = [arr[arr.length - 1], arr[i + 1]];
  highlightContainers([containersArray[i + 1], containersArray[containersArray.length - 1]], '#2196F3');
  await delay(500);

  [containersArray[i + 1], containersArray[containersArray.length - 1]] = [containersArray[containersArray.length - 1], containersArray[i + 1]];
  [containersArray[i + 1].style.left, containersArray[containersArray.length - 1].style.left] = [containersArray[containersArray.length - 1].style.left, containersArray[i + 1].style.left];
  await delay(500);
  
  highlightContainers([containersArray[i + 1], containersArray[containersArray.length - 1]], '#4CAF50');


  i++;

  const leftPartNumbers = arr.slice(0, i);
  const leftPartContainers = containersArray.slice(0, i);

  const rightPartNumbers = arr.slice(i + 1);
  const rightPartContainers = containersArray.slice(i + 1);


  const sortedLeft = await quickSort(leftPartNumbers, leftPartContainers);
  const sortedRight = await quickSort(rightPartNumbers, rightPartContainers);
  
  return {resultNumber: sortedLeft.resultNumber.concat([pivot]).concat(sortedRight.resultNumber), resultContainer: sortedLeft.resultContainer.concat([pivotContainer]).concat(sortedRight.resultContainer)};
}

//console.log(quickSort(array));