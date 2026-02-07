async function insertionSort (arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }

  let arrCopy = [...arr];

  if (isSorted(arrCopy)) {
    toggleVisibilityBtn(resetBtn);
    return arrCopy;
  }

  let sortedPart = [arrCopy[0]];
  
  for (let i = 1; i <= arrCopy.length - 1; i++) {
    for (let j = 0; j <= sortedPart.length - 1; j++) {
      if (arrCopy[i] <= sortedPart[j]) {
        sortedPart.splice(j, 0, arrCopy[i]);
        const removedElement = containersArray.splice(i, 1)[0];
        containersArray.splice(j, 0, removedElement);
        recalculatePosition(containersArray);

        await new Promise(resolve => setTimeout(resolve, 500));
        
        break;
      } else if (arrCopy[i] >= sortedPart[j] && j == sortedPart.length - 1) {
        sortedPart.splice(j + 1, 0, arrCopy[i]);
        const removedElement = containersArray.splice(i, 1)[0];
        containersArray.splice(j + 1, 0, removedElement);
        recalculatePosition(containersArray);

        break;
      }
    }
  }
  
  toggleVisibilityBtn(resetBtn);

  return sortedPart;
}