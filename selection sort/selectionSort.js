async function selectionSort (arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }

  let arrCopy = [...arr]
  for (let i = 0; i < arrCopy.length - 1; i++) {
    let slicedArray = arrCopy.slice(i);
    let minValueIndex = getMinValueIndex(slicedArray);

    if (minValueIndex !== 0) {
      //запоминаем значение с которое меняем с i
      const savedValue = arrCopy[minValueIndex + i];
      const savedContainer = containersArray[minValueIndex + i];
      const savedOrder = containersArray[minValueIndex + i].style.order;

      arrCopy[minValueIndex + i] = arr[i];
      arrCopy[i] = savedValue;

      const currentOrder = containersArray[i].style.order;
      containersArray[i].style.order = savedOrder;
      containersArray[minValueIndex + i].style.order = currentOrder;

      containersArray[minValueIndex + i] = containersArray[i];
      containersArray[i] = savedContainer;
    } else {
      continue;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return arrCopy;
}

async function startSelectionSorting () {
  toggleVisibilityBtn(sortBtn);
  setValuesFromInput();
  toggleVisibilityInputs();
  toggleVisibilityValues();
  await setHeight();
  let valuesContainers = setStartOrder();
  let array = getArray();
  selectionSort(array, valuesContainers);
}

sortBtn.addEventListener('click', startSelectionSorting);
