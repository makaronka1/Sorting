const sortBtn = document.querySelector('.sort-button');
const resetBtn = document.querySelector('.reset-button');
const fillBtn = document.querySelector('.fill-button');
const arrowBtns = document.querySelectorAll('.arrow-container');
const addButton = document.querySelector('.add-button');
const removeButton = document.querySelector('.remove-button');

const sortType = ['Bubble sort', 'Selection sort', 'Insertion sort', 'Merge sort', 'Quick sort'];

toggleVisibilityBtn(resetBtn);

async function startSort () {
  const sortType = getSortMethod();
  toggleVisibilityBtn(sortBtn);
  toggleVisibilityBtn(fillBtn);
  toggleVisibilityBtn(addButton);
  toggleVisibilityBtn(removeButton);
  toggleVisibilityBtn(arrowBtns[0]);
  toggleVisibilityBtn(arrowBtns[1]);
  setValuesFromInput();
  toggleVisibilityInputs();
  toggleVisibilityValues();
  await setHeight();
  let valuesContainers = setStartPosition();
  let array = getArray();

  if (sortType == 'Bubble sort') {
    bubbleSorting(array, valuesContainers);
  } else if (sortType == 'Selection sort') {
    selectionSort(array, valuesContainers);
  } else if (sortType == 'Insertion sort') {
    insertionSort(array, valuesContainers);
  } else if (sortType == 'Merge sort') {
    await mergeSort(array, valuesContainers);
    toggleVisibilityBtn(resetBtn);
  } else if (sortType == 'Quick sort') {
    await quickSort(array, valuesContainers);
    toggleVisibilityBtn(resetBtn);
  }
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
  toggleVisibilityBtn(fillBtn);
  toggleVisibilityBtn(arrowBtns[0]);
  toggleVisibilityBtn(arrowBtns[1]);
  toggleVisibilityBtn(addButton);
  toggleVisibilityBtn(removeButton);
}

function changeSortType (e) {
  const target = e.currentTarget;
  const currentSortMethod = getSortMethod();
  const currentSortIndex = sortType.indexOf(currentSortMethod);

  if (target.classList.contains('left')) {
    if (currentSortIndex != 0) {
      document.querySelector('h1').textContent = sortType[currentSortIndex - 1];
    } else {
      document.querySelector('h1').textContent = sortType[sortType.length - 1];
    }
  } else if (target.classList.contains('right')) {
    if (currentSortIndex != sortType.length - 1) {
      document.querySelector('h1').textContent = sortType[currentSortIndex + 1];
    } else {
      document.querySelector('h1').textContent = sortType[0];
    }
  }
}

function fillRandomValues () {
  const inputs = document.querySelectorAll('.value-input');

  for (let input of inputs) {
    input.value = getRandomIntInRange();
  }
}

arrowBtns[0].addEventListener('click', changeSortType);
arrowBtns[1].addEventListener('click', changeSortType);

resetBtn.addEventListener('click', reset);
sortBtn.addEventListener('click', startSort);
fillBtn.addEventListener('click', fillRandomValues);
addButton.addEventListener('click', addValueElement);
removeButton.addEventListener('click', removeValueElement);