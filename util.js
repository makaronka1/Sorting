const valuesContainerInner = document.querySelector('.values-container-inner');

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
  let total = sortedContainerValues.length;
  
  for (let i = 0; i < total; i++) {
    if (i > 0 && sortedContainerValues[i].querySelector('.value-number').textContent === 
                  sortedContainerValues[i - 1].querySelector('.value-number').textContent) {
      sortedContainerValues[i].style.height = sortedContainerValues[i - 1].style.height;
    } else {
      let height = total === 1 ? 100 : 100 - (i * (85 / (total - 1)));
      sortedContainerValues[i].style.height = height + '%';
    }
  }
  
  await delay(500);
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

function recalculatePosition (arr) {
  for (let i = 0; i < arr.length; i++) {
    let left = (i * 45) + ((i + 1) * 50) + 'px';
    arr[i].style.left = left;
  }

  return arr;
}

function getSortMethod () {
  return document.querySelector('h1').textContent;
}

function getRandomIntInRange() {
  const min = -99;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function highlightContainers (arr, color) {
  for (let container of arr) {
    container.style.backgroundColor = color;
  }
}

async function repositionMergedElements  (resultNumber, resultContainer) {
    let minLeft = Infinity;

    highlightContainers(resultContainer, '#2196F3');
    
    for (let container of resultContainer) {
      if (container && container.style.left) {
          const leftValue = parseInt(container.style.left);
          if (!isNaN(leftValue) && leftValue < minLeft) {
              minLeft = leftValue;
          }
      }
    }
    
    for (let i = 0; i < resultContainer.length; i++) {
      const container = resultContainer[i];
      if (container) {
          const newLeft = minLeft + (i * 95);
          container.style.left = newLeft + 'px';     
          await delay(200);
      }
    }
    
    highlightContainers(resultContainer, '#4CAF50');

    await delay(500);

    
    return {
        resultNumber: resultNumber,
        resultContainer: resultContainer
    };
}

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createValueElement () {
  const valueDiv = document.createElement('div');
  valueDiv.className = 'value';
  
  const input = document.createElement('input');
  input.className = 'value-input';
  input.type = 'text';
  
  const numberDiv = document.createElement('div');
  numberDiv.className = 'value-number hidden';
  
  valueDiv.appendChild(input);
  valueDiv.appendChild(numberDiv);

  return valueDiv;
}

function addWidth () {
  valuesContainerInner.style.width = valuesContainerInner.clientWidth + 95 + 'px';
}

function removeWidth () {
  valuesContainerInner.style.width = valuesContainerInner.clientWidth - 95 + 'px';
}

function addValueElement () {
  let elem = createValueElement();
  valuesContainerInner.appendChild(elem);
  if (document.querySelectorAll('.value-number').length > 6) {
    addWidth();
  }
  setStartPosition();
}

function removeValueElement () {
  valuesContainerInner.lastElementChild?.remove();
  removeWidth();
}



setStartPosition();
toggleVisibilityValues();