const sortBtn = document.querySelector('.sort-button');
const resetBtn = document.querySelector('.reset-button');

function getValuesFromInput () {
  let inputs = document.querySelectorAll('.value-input');
  let valuesFromInputs = [];

  for (let input of inputs) {
    if (input.value != '') {
      valuesFromInputs.push(parseInt(input.value));
    } else {
      valuesFromInputs.push(0);
    }
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

function getMinValueIndex(arr) {
  const min = Math.min(...arr);
  return arr.indexOf(min);
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

function swapElements (firstIndex, secondIndex, containersArray, array) {
  const savedValue = array[firstIndex];
  const savedContainer = containersArray[firstIndex];
  const savedOrder = containersArray[firstIndex].style.order;
        
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = savedValue;
        
  const currentOrder = containersArray[secondIndex].style.order;
  containersArray[secondIndex].style.order = savedOrder;
  containersArray[firstIndex].style.order = currentOrder;
        
  containersArray[firstIndex] = containersArray[secondIndex];
  containersArray[secondIndex] = savedContainer;
}

function swapPosition (firstIndex, secondIndex, containersArray, array) {
  const savedValue = array[firstIndex];
  const savedContainer = containersArray[firstIndex];
  const savedLeft = containersArray[firstIndex].style.left;

  array[firstIndex] = array[secondIndex];
  array[secondIndex] = savedValue;
        
  const currentLeft = containersArray[secondIndex].style.left;
  containersArray[secondIndex].style.left = savedLeft;
  containersArray[firstIndex].style.left = currentLeft;
        
  containersArray[firstIndex] = containersArray[secondIndex];
  containersArray[secondIndex] = savedContainer;
}

function setStartPosition () {
  let valuesContainers = document.querySelectorAll('.value');

  for (let i = 0; i < valuesContainers.length; i++) {
    let left = (i * 45) + ((i + 1) * 50) + 'px';
    valuesContainers[i].style.left = left;
  }

  return valuesContainers;
}

setStartPosition();
toggleVisibilityValues();
toggleVisibilityBtn(resetBtn);