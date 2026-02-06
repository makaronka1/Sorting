async function selectionSort (arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }

  let arrCopy = [...arr];

  if (isSorted(arrCopy)) {
    toggleVisibilityBtn(resetBtn);
    return arrCopy;
  }

  for (let i = 0; i < arrCopy.length - 1; i++) {
    let slicedArray = arrCopy.slice(i);
    let minValueIndex = getMinValueIndex(slicedArray);

    if (minValueIndex !== 0) {
      swapPosition(minValueIndex + i, i, containersArray, arrCopy);
    } else {
      continue;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }
  toggleVisibilityBtn(resetBtn);
  return arrCopy;
}

async function startSelectionSorting () {
  toggleVisibilityBtn(sortBtn);
  setValuesFromInput();
  toggleVisibilityInputs();
  toggleVisibilityValues();
  await setHeight();
  let valuesContainers = setStartPosition();
  let array = getArray();
  selectionSort(array, valuesContainers);
}

//sortBtn.addEventListener('click', startSelectionSorting);
