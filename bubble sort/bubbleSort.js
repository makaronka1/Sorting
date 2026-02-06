

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