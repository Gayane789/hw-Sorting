// Bubble Sort Function
function bubbleSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function selectionSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

function insertionSortFun(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

function mergeSortFun(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSortFun(arr.slice(0, mid));
    const right = mergeSortFun(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
////////////////////////////////////////////////////////////////////////////////////////////////////

// Clear input and result
function handleClearText() {
    document.getElementById("text-input").value = "";
    document.getElementById("result-display").innerHTML = "";
}

// Validate user input
function validateUserInput(numbers) {
    return numbers.length !== 0 && numbers.every(num => !isNaN(num));
}

// Show error message
function showErrorMessage() {
    document.getElementById("result-display").innerHTML = `<p style="color:#F44336">Please enter valid numbers</p>`;
}

// Display result
function outputResult(result) {
    document.getElementById("result-display").innerHTML = `Sorted Result: ${result.join(', ')}`;
}

// Main function to handle sorting
function handleSortText(calculateAlgorithm) {
    const textInput = document.getElementById("text-input").value.trim();
    const numbers = textInput.split(',').map(num => num.trim()).filter(Boolean).map(Number);
    
    if (validateUserInput(numbers)) {
        const result = calculateAlgorithm(numbers);
        outputResult(result);
    } else {
        showErrorMessage();
    }
}

// Cache Wrapper
const calculateWithCacheFunction = (calculateAlgorithm) => {
    const cache = {};

    return function (numbers) {
        const key = numbers.join(',');
        if (cache[key] !== undefined) {
            return cache[key];
        }

        const result = calculateAlgorithm([...numbers]);
        cache[key] = result;
        return result;
    };
};

const calculateBubble = calculateWithCacheFunction(bubbleSortFun);
const calculateSelection = calculateWithCacheFunction(selectionSortFun);
const calculateInsertion = calculateWithCacheFunction(insertionSortFun);
const calculateMerge = calculateWithCacheFunction(mergeSortFun);
