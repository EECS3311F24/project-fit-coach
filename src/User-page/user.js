function openFn() {
    const over = document.getElementById("overlay");
    const popDialog = document.getElementById("popupDialog");
    over.classList.toggle("visible");
    popDialog.classList.toggle("visible");
}
let exerciseCount = 1;    
function addSetRow(button) {
    const exerciseRow = button.closest('tr');
    const setsContainer = exerciseRow.querySelector('.sets-container');
    const weightsContainer = exerciseRow.querySelector('td:last-child .sets-container');
    
    const currentSetCount = setsContainer.children.length;
    const newSetNumber = currentSetCount + 1;
    
    // Add new reps input
    const newSetDiv = document.createElement('div');
    newSetDiv.className = 'input-group';
    newSetDiv.innerHTML = `<span>Set ${newSetNumber}<input type="text" class="input-field" placeholder="Reps"></span>`;
    setsContainer.appendChild(newSetDiv);
    
    // Add corresponding weight input
    const newWeightDiv = document.createElement('div');
    newWeightDiv.className = 'input-group';
    newWeightDiv.innerHTML = `<input type="text" class="input-field" placeholder="Input weight in Kgs">`;
    weightsContainer.appendChild(newWeightDiv);
}

function addExerciseRow() {
    exerciseCount++;
    const table = document.getElementById('exerciseTable').getElementsByTagName('tbody')[0];

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${exerciseCount}
            <input type="text" class="input-field" placeholder="Exercise">
        </td>
        <td>
            <div class="sets-container">
                <div class="input-group">
                    <span>Set 1<input type="text" class="input-field" placeholder="Reps"></span>
                </div>
            </div>
            <button class="add-row-btn" onclick="addSetRow(this)">Insert Set</button>
        </td>
        <td>
            <div class="sets-container">
                <div class="input-group">
                    <input type="text" class="input-field" placeholder="Input weight in Kgs">
                </div>
            </div>
        </td>
    `;
    table.appendChild(newRow);
}


let btn = document.querySelector('#btn')
let sidebar = document.querySelector('sidebar')
btn.onclick = function(){
    sidebar.classList.toggle('active');
};

const monthYearElement = document.getElementById('monthYear');
const datesElement = document.querySelector('.dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalender = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, -i + 1);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    for (let i = 1; i <= 6 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalender();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalender();
});

updateCalender();

document.addEventListener('DOMContentLoaded', function() {
    const weightInput = document.getElementById('weight');
    const weightUnit = document.getElementById('weight-unit');
    const heightInput = document.getElementById('height');
    const heightUnit = document.getElementById('height-unit');

    // Weight unit conversion
    weightUnit.addEventListener('change', () => {
        const unit = weightUnit.value;

        // Convert the current weight input value to the selected unit
        if (weightInput.value) {
            let weight = parseFloat(weightInput.value);
            switch (unit) {
                case 'lbs':
                    weightInput.value = (weight * 2.20462).toFixed(2); // Convert kg to lbs
                    break;
                case 'st':
                    weightInput.value = (weight * 0.157473).toFixed(2); // Convert kg to stones
                    break;
                case 'kg':
                    weightInput.value = weight; // Assume input is in kg by default
                    break;
            }
        }
    });

    // Height unit conversion
    heightUnit.addEventListener('change', () => {
        const unit = heightUnit.value;

        // Convert the current height input value to the selected unit
        if (heightInput.value) {
            let height = parseFloat(heightInput.value);
            switch (unit) {
                case 'in':
                    heightInput.value = (height * 0.393701).toFixed(2); // Convert cm to inches
                    break;
                case 'cm':
                    heightInput.value = height; // Assume input is in cm by default
                    break;
            }
        }
    });
});

function saveWorkout() {
    const table = document.getElementById('exerciseTable');
    const rows = table.querySelectorAll('tbody tr');

    let workoutData = [];

    rows.forEach(row => {
        const exercise = row.querySelector('td:nth-child(1) input').value;
        const repsInputs = row.querySelectorAll('td:nth-child(2) .input-field');
        const weightInputs = row.querySelectorAll('td:nth-child(3) .input-field');

        let sets = [];
        repsInputs.forEach((repInput, index) => {
            sets.push({
                reps: repInput.value,
                weight: weightInputs[index].value
            });
        });

        workoutData.push({ exercise, sets });
    });

    // Display the workout data
    const workoutsList = document.getElementById('workoutsList');
    workoutData.forEach(workout => {
        const workoutItem = document.createElement('li');
        workoutItem.innerHTML = `
            <strong>Exercise:</strong> ${workout.exercise} <br>
            <strong>Sets:</strong>
            <ul>
                ${workout.sets
                    .map(
                        set => `<li>Reps: ${set.reps}, Weight: ${set.weight}</li>`
                    )
                    .join('')}
            </ul>
        `;
        workoutsList.appendChild(workoutItem);
    });

    // Provide feedback to the user
    alert("Workout saved successfully!");

    // Optionally, clear the input fields
    rows.forEach(row => {
        row.querySelector('td:nth-child(1) input').value = '';
        row.querySelectorAll('td:nth-child(2) .input-field').forEach(input => input.value = '');
        row.querySelectorAll('td:nth-child(3) .input-field').forEach(input => input.value = '');
    });
}



