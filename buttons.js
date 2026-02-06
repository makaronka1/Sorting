const sortBtn = document.querySelector('.sort-button');
const resetBtn = document.querySelector('.reset-button');

toggleVisibilityBtn(resetBtn);

async function startSort () {
  const sortType = getSortMethod();
  toggleVisibilityBtn(sortBtn);
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
}

resetBtn.addEventListener('click', reset);
sortBtn.addEventListener('click', startSort);