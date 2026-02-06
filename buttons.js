const sortBtn = document.querySelector('.sort-button');
const resetBtn = document.querySelector('.reset-button');
const arrowBtns = document.querySelectorAll('.arrow-container');

const sortType = ['Bubble sort', 'Selection sort'];

toggleVisibilityBtn(resetBtn);

async function startSort () {
  const sortType = getSortMethod();
  toggleVisibilityBtn(sortBtn);
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
  toggleVisibilityBtn(arrowBtns[0]);
  toggleVisibilityBtn(arrowBtns[1]);
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

arrowBtns[0].addEventListener('click', changeSortType);
arrowBtns[1].addEventListener('click', changeSortType);

resetBtn.addEventListener('click', reset);
sortBtn.addEventListener('click', startSort);