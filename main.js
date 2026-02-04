const sortBtn = document.querySelector('.sort-button');
const resetBtn = document.querySelector('.reset-button');

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

function isSorted (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true;
}

function getArray () {
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

function sortValueContainers() {
  const parentContainer = document.querySelector('.values-container');
  const valueElements = Array.from(parentContainer.querySelectorAll('.value'));
  
  valueElements.sort((a, b) => {
    const aValue = parseInt(a.querySelector('.value-number').textContent.trim());
    const bValue = parseInt(b.querySelector('.value-number').textContent.trim());
    return bValue - aValue;
  });
  
  return valueElements;
}

async function setHeight() {
  let sortedContainerValues = sortValueContainers();

  for (let i = 0; i < sortedContainerValues.length; i++) {
    if (i > 0 && sortedContainerValues[i].querySelector('.value-number').textContent == sortedContainerValues[i - 1].querySelector('.value-number').textContent) {
      sortedContainerValues[i].style.height = sortedContainerValues[i - 1].style.height;
    } else {
      let height = 100 - (i * 15) + '%';
      sortedContainerValues[i].style.height = height;
    }
      
  }

  await new Promise(resolve => setTimeout(resolve, 500));
}

function getValuesFromInput () {
  let inputs = document.querySelectorAll('.value-input');
  let valuesFromInputs = [];

  for (let input of inputs) {
    valuesFromInputs.push(input.value);
  }

  return valuesFromInputs;
}

function setValuesFromInput () {
  let values = getValuesFromInput();
  let valueContainers = document.querySelectorAll('.value-number');

  for (let i = 0; i < values.length; i++) {
    valueContainers[i].textContent = values[i];
  }
}

function toggleVisibilityInputs () {
  let inputs = document.querySelectorAll('.value-input');

  for (let input of inputs) {
    input.classList.toggle('hidden');
  }
}

function toggleVisibilityValues () {
  let inputs = document.querySelectorAll('.value-number');

  for (let input of inputs) {
    input.classList.toggle('hidden');
  }
}

function toggleVisibilityBtn (button) {
  button.classList.toggle('hidden');
}

function clearValues() {
  let valueContainers = document.querySelectorAll('.value-number');

  for (let value of valueContainers) {
    value.textContent = '';
  }
}

function clearStyles () {
  let containers = document.querySelectorAll('.value');

  for (let container of containers) {
    container.removeAttribute('style');
  }
}

function clearInputs () {
  let inputs = document.querySelectorAll('.value-input');

  for (let input of inputs) {
    input.value = '';
  }
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

toggleVisibilityValues();

toggleVisibilityBtn(resetBtn);

sortBtn.addEventListener('click', startSorting);
resetBtn.addEventListener('click', reset);

