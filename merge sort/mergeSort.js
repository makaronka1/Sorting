async function mergeSort(array, containersArray) {
  if (containersArray && typeof containersArray.forEach === 'function' && !Array.isArray(containersArray)) {
    containersArray = Array.from(containersArray);
  }

  if (array.length <= 1) {
    return {
      resultNumber: array,
      resultContainer: containersArray
    };
  }

  const mid = Math.floor(array.length / 2);
	
  const leftPart = array.slice(0, mid);
  const containersLeftPart = containersArray.slice(0, mid);
  
  const rightPart = array.slice(mid);
  const containersRightPart = containersArray.slice(mid);

  const resultLeft = await mergeSort(leftPart, containersLeftPart);
  const resultRight = await mergeSort(rightPart, containersRightPart);

  return await merge(
    resultLeft.resultNumber,
    resultRight.resultNumber,
    resultLeft.resultContainer,
    resultRight.resultContainer
  );
}

async function merge(left, right, leftContainer, rightContainer) {
	let resultNumber = [];
	let resultContainer = []
	let i = 0;
	let j = 0;

	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) {
				resultNumber.push(left[i]);
				resultContainer.push(leftContainer[i]);
				i++;
		} else {
				resultNumber.push(right[j]);
				resultContainer.push(rightContainer[j]);
				j++;
		}
	}
	
	while (i < left.length) {
		resultNumber.push(left[i]);
		resultContainer.push(leftContainer[i]);
		i++;
	}
	
	while (j < right.length) {
		resultNumber.push(right[j]);
		resultContainer.push(rightContainer[j]);
		j++;
	}

	return await repositionMergedElements (resultNumber, resultContainer)
}
