class BubbleSort {
    static sort(array) {
        if (!Array.isArray(array)) {
            throw new Error("Input is not an array.");
        }

        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (typeof array[j] !== 'number' || typeof array[j + 1] !== 'number') {
                    throw new Error("Array contains non-numeric values.");
                }
                if (array[j] > array[j + 1]) {
                    // Swap
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
        return array;
    }
}

class QuickSort {
    static sort(array) {
        if (!Array.isArray(array)) {
            throw new Error("Input is not an array.");
        }

        if (array.length <= 1) {
            return array;
        }
        let pivot = array[array.length - 1];
        let left = [];
        let right = [];
        for (let i = 0; i < array.length - 1; i++) {
            if (typeof array[i] !== 'number') {
                throw new Error("Array contains non-numeric values.");
            }
            if (array[i] < pivot) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }
        return [...QuickSort.sort(left), pivot, ...QuickSort.sort(right)];
    }
}

class SortingTester {
    static generateRandomArray(size, maxValue) {
        if (typeof size !== 'number' || size <= 0) {
            throw new Error("Invalid size input.");
        }

        if (typeof maxValue !== 'number' || maxValue <= 0) {
            throw new Error("Invalid maxValue input.");
        }

        return Array.from({ length: size }, () => Math.floor(Math.random() * maxValue));
    }

    static testSortingAlgorithm(algorithm, array) {
        try {
            const start = process.hrtime();
            const sortedArray = algorithm.sort([...array]); 
            const end = process.hrtime(start);
            SortingTester.verifySortedArray(sortedArray);
            return { time: end, sortedArray };
        } catch (error) {
            console.error(`Error during sorting: ${error.message}`);
        }
    }

    static verifySortedArray(array) {
        if (!Array.isArray(array)) {
            throw new Error("Input is not an array.");
        }

        for (let i = 0; i < array.length - 1; i++) {
            if (typeof array[i] !== 'number' || typeof array[i + 1] !== 'number') {
                throw new Error("Array contains non-numeric values.");
            }
            if (array[i] > array[i + 1]) {
                throw new Error("Array is not sorted correctly.");
            }
        }
    }
}


const arraySize = 1000; 
const maxValue = 10000;
const testArray = SortingTester.generateRandomArray(arraySize, maxValue);

console.log("Random Array:", testArray);

console.log("Starting Bubble Sort...");
let bubbleSortResult = SortingTester.testSortingAlgorithm(BubbleSort, testArray);
if (bubbleSortResult) {
    console.log(`Bubble Sort took ${bubbleSortResult.time[0]} seconds and ${bubbleSortResult.time[1] / 1000000} milliseconds.`);
    console.log("Bubble Sorted Array:", bubbleSortResult.sortedArray);
}

console.log("Starting Quick Sort...");
let quickSortResult = SortingTester.testSortingAlgorithm(QuickSort, testArray);
if (quickSortResult) {
    console.log(`Quick Sort took ${quickSortResult.time[0]} seconds and ${quickSortResult.time[1] / 1000000} milliseconds.`);
    console.log("Quick Sorted Array:", quickSortResult.sortedArray);
}
