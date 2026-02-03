
async function bubbleSorting(arr, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }
  
  let isStopped = false;
  
  while (!isStopped) {
    for (let i = 0; i < arr.length - 1; i++) {
      
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
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
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

function gettingArray () {
  let array = [];
  let values = document.querySelectorAll('.value-number');
  for (let value of values) {
    let textValue = value.textContent;
    array.push(Number(textValue));
  }
  return array;
}

function setStartOrder () {
  let valuesContainers = document.querySelectorAll('.value');

  for (let i = 0; i < valuesContainers.length; i++) {
    valuesContainers[i].style.order = i;
  }

  return valuesContainers;
}

function startSorting () {
  let valuesContainers = setStartOrder();
  let array = gettingArray();
  bubbleSorting(array, valuesContainers);
}

let sortBtn = document.querySelector('.button');
sortBtn.addEventListener('click', startSorting);

