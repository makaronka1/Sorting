

async function bubbleSorting(arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }
  
  let isStopped = false;
  
  while (!isStopped) {
    for (let i = 0; i < arr.length - 1; i++) {

      if (isSorted(arr)) {
        isStopped = true;
      }
      
      if (arr[i] > arr[i + 1]) {
        const savedValue = arr[i + 1];
        const savedContainer = containersArray[i + 1];
        const savedOrder = containersArray[i + 1].style.order;
        
        arr[i + 1] = arr[i];
        arr[i] = savedValue;
        
        const currentOrder = containersArray[i].style.order;
        containersArray[i].style.order = savedOrder;
        containersArray[i + 1].style.order = currentOrder;
        
        containersArray[i + 1] = containersArray[i];
        containersArray[i] = savedContainer;
        
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
  clearInputs();
  toggleVisibilityBtn(resetBtn);
  toggleVisibilityBtn(sortBtn);
}

async function startSorting () {
  toggleVisibilityBtn(sortBtn);
  setValuesFromInput();
  toggleVisibilityInputs();
  toggleVisibilityValues();
  await setHeight();
  let valuesContainers = setStartOrder();
  let array = getArray();
  bubbleSorting(array, valuesContainers);
}

sortBtn.addEventListener('click', startSorting);
resetBtn.addEventListener('click', reset);