document.getElementById('sortButton').addEventListener('click', () => {
    const input = document.getElementById('userArray').value;
    const array = input.split(',').map(Number);
    visualizeSorting(array);
});

function visualizeSorting(array) {
    const visualization = document.getElementById('visualization');
    const sortedOutput = document.getElementById('sortedOutput');
    visualization.innerHTML = ''; // Clear previous visualization
    sortedOutput.innerHTML = ''; // Clear previous sorted output

    // Create square boxes for each number
    array.forEach(num => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = num;
        visualization.appendChild(box);
    });

    // Bubble sort with visualization
    let i = 0, j = 0;
    const interval = setInterval(() => {
        if (i < array.length) {
            if (j < array.length - i - 1) {
                const boxes = visualization.querySelectorAll('.box');

                // Reset previous blink effect
                boxes[j].classList.remove('blink');
                boxes[j + 1].classList.remove('blink');

                // Blink current comparison
                boxes[j].classList.add('blink');
                boxes[j + 1].classList.add('blink');

                // Swap if needed
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];

                    // Update visualization: Swap content in boxes
                    boxes[j].textContent = array[j];
                    boxes[j + 1].textContent = array[j + 1];
                }
                j++;
            } else {
                // End of inner loop, move to the next pass
                j = 0;
                i++;
            }
        } else {
            // Sorting complete
            clearInterval(interval);
            sortedOutput.innerHTML = `Sorted Array: ${array.join(', ')}`;
        }
    }, 300); // Adjust delay for visualization steps
}








