

async function bubbleSorting(arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }
  
  let isStopped = false;
  
  while (!isStopped) {
    for (let i = 0; i < arr.length - 1; i++) {

      if (isSorted(arr)) {
        isStopped = true;
        toggleVisibilityBtn(resetBtn);
      }
      
      if (arr[i] > arr[i + 1]) {
        //запоминаем значение с которым меняемся
        // const savedValue = arr[i + 1];
        // const savedContainer = containersArray[i + 1];
        // const savedOrder = containersArray[i + 1].style.order;
        
        // arr[i + 1] = arr[i];
        // arr[i] = savedValue;
        
        // const currentOrder = containersArray[i].style.order;
        // containersArray[i].style.order = savedOrder;
        // containersArray[i + 1].style.order = currentOrder;
        
        // containersArray[i + 1] = containersArray[i];
        // containersArray[i] = savedContainer;
        //swapElements(i + 1, i, containersArray, arr);
        swapPosition(i + 1, i, containersArray, arr);
        if (isSorted(arr)) {
          isStopped = true;
          toggleVisibilityBtn(resetBtn);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  
  return arr;
}

function reset () {
  clearValues();
  toggleVisibilityInputs();
  toggleVisibilityValues();
  clearStyles();
  setStartPosition();
  clearInputs();
  toggleVisibilityBtn(resetBtn);
  toggleVisibilityBtn(sortBtn);
}

async function startBubbleSorting () {
  toggleVisibilityBtn(sortBtn);
  setValuesFromInput();
  toggleVisibilityInputs();
  toggleVisibilityValues();
  await setHeight();
  let valuesContainers = setStartPosition();
  let array = getArray();
  bubbleSorting(array, valuesContainers);
}

sortBtn.addEventListener('click', startBubbleSorting);
resetBtn.addEventListener('click', reset);