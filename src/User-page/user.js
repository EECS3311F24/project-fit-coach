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





let prevchart = null;

function calculateCalories() {

    
    // Fetch input values
    const weight = parseFloat(document.getElementById("weight").value);
    const weightUnit = document.getElementById("weight-unit").value;
    const height = parseFloat(document.getElementById("height").value);
    const heightUnit = document.getElementById("height-unit").value;
    const age = parseInt(document.getElementById("age").value);
    const exerciseFrequency = parseInt(document.getElementById("exercise-frequency").value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    //fetch user choice of macros to calculate macros to be eaten
    const proteininput = parseInt(document.getElementById("Protein").value);
    const carbsinput = parseInt(document.getElementById("Carbs").value);
    const fatinput = parseInt(document.getElementById("Fat").value);

    // Ensure inputs are valid
    if (!weight || !height || !age || !gender||
        !proteininput || !carbsinput || !fatinput) {
        alert("Please fill in all fields!");
        return;
    }

    // Convert weight to kg if necessary
    const weightInKg = (weightUnit === "kg") ? weight :
                       (weightUnit === "lbs") ? weight * 0.453592 :
                       weight * 6.35029; // st to kg

    // Convert height to cm if necessary
    const heightInCm = (heightUnit === "cm") ? height :
                       height * 2.54; // in to cm

    // Calculate BMR
    let BMR;
    if (gender === "male") {
        BMR = (88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age))*1.15;
    } else {
        BMR = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
    }

    // Determine activity multiplier based on exercise frequency
    const activityMultipliers = [1, 1.05, 1.1, 1.15, 1.2, , 1.25, 1.3, 1.35];
    const activityFactor = activityMultipliers[exerciseFrequency];
    // Calculate TDEE (Total Daily Energy Expenditure)
    const TDEE = Math.round(BMR * activityFactor);
    // alert(`Based on your inputs, your estimated daily calorie needs are ${TDEE} calories.`);
    // resultContainer.style.color = "green";
    if( proteininput + carbsinput + fatinput !== 100){
        alert("Please ensure that the sum of your macros is 100%");

    }else{       
       //total calorie consumption 
        const resultContainer = document.getElementById("calorie-result");
        resultContainer.textContent = `Your estimated daily calorie needs are: ${TDEE} calories.`;
        //total macro consumption
        const proteinoutput = (TDEE * (parseFloat(proteininput) / 100)) / 4; 
        const carbsoutput = (TDEE * (parseFloat(carbsinput) / 100)) / 4;
        const fatoutput = (TDEE * (parseFloat(fatinput) / 100)) / 9;
    
    
        // disclaimer:
        //When user successfully generates chart, if user proceeds to change macros to
        // get different results, code will generate new table on top of previous, 
        // creating two charts stacked on eachother



         // update: bug fixed :) 
         // now we ensure there is only one instance of a chart every time (⌐■_■)
         if(prevchart  !== null ){
             prevchart.destroy();
         }



        //generation of the chart
        const xValues = ["Protein", "Carbs", "Fat"];
        const yValues = [proteinoutput,carbsoutput,fatoutput];    
        const barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797"];
    
        prevchart = new Chart("myChart", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            title: {
            display: true,
            text: "Your Macros for the day!",
            fontColor: "black",
            },
            legend: {
                labels: {
                    fontColor: "black",
                }
            },
        }
        });
    }

    

}

document.addEventListener('DOMContentLoaded', () => {
    const mainColorSelect = document.getElementById('main-color');
    const secondaryColorSelect = document.getElementById('secondary-color');
    const applyColorsButton = document.getElementById('apply-colors');
    const sidebarItems = Array.from(document.querySelectorAll('.sidebar ul li a'));
    const sidebarToggleButton = document.getElementById('btn');
    const fitCoachText = document.querySelector('.logo span'); // Target Fit Coach text

    // Helper function to determine appropriate text color
    const getTextColor = (color) => {
        if (color === '#FFFFFF' || color.toLowerCase() === 'white') {
            return '#000000'; // Black text for white background
        }
        if (color === '#000000' || color.toLowerCase() === 'black') {
            return '#FFFFFF'; // White text for black background
        }
        const rgb = color.startsWith('#') ? color.slice(1) : color;
        const r = parseInt(rgb.substring(0, 2), 16);
        const g = parseInt(rgb.substring(2, 4), 16);
        const b = parseInt(rgb.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 186 ? '#000000' : '#FFFFFF';
    };

    const updateFitCoachText = (textElement, mainColor, secondaryColor) => {
        let textColor = getTextColor(mainColor); // Default text color based on main color

        // Special exception: if main is white or both main and secondary are white
        if (
            (mainColor === '#FFFFFF' || mainColor.toLowerCase() === 'white') ||
            ((mainColor === '#FFFFFF' || mainColor.toLowerCase() === 'white') &&
                (secondaryColor === '#FFFFFF' || secondaryColor.toLowerCase() === 'white'))
        ) {
            textColor = '#000000'; // Force text to black
        }

        // Apply the determined text color
        textElement.style.color = textColor;
    };

    const updateElementColors = (element, backgroundColor) => {
        element.style.backgroundColor = backgroundColor;
        element.style.color = getTextColor(backgroundColor);
    };

    const updateOptionColors = (selectElement, backgroundColor, textColor) => {
        Array.from(selectElement.options).forEach((option) => {
            option.style.backgroundColor = backgroundColor;
            option.style.color = textColor;
        });
    };

    const updateSidebarColors = (sidebarItems, backgroundColor, textColor) => {
        sidebarItems.forEach((item) => {
            item.style.backgroundColor = backgroundColor; // Update background color
            item.style.color = textColor; // Update text color
        });
    };

    const updateSidebarToggleButton = (button, backgroundColor, textColor) => {
        button.style.backgroundColor = backgroundColor;
        button.style.color = textColor;
    };

    const savedMainColor = localStorage.getItem('mainColor') || '#1a212b';
    const savedSecondaryColor = localStorage.getItem('secondaryColor') || '#ffffff';
    document.documentElement.style.setProperty('--main-color', savedMainColor);
    document.documentElement.style.setProperty('--secondary-color', savedSecondaryColor);

    mainColorSelect.value = savedMainColor;
    secondaryColorSelect.value = savedSecondaryColor;

    updateElementColors(mainColorSelect, savedMainColor);
    updateOptionColors(mainColorSelect, savedMainColor, getTextColor(savedMainColor));
    updateElementColors(secondaryColorSelect, savedSecondaryColor);
    updateOptionColors(secondaryColorSelect, savedSecondaryColor, getTextColor(savedSecondaryColor));
    updateElementColors(applyColorsButton, savedSecondaryColor);
    updateSidebarColors(sidebarItems, savedSecondaryColor, getTextColor(savedSecondaryColor));
    updateSidebarToggleButton(sidebarToggleButton, savedSecondaryColor, getTextColor(savedSecondaryColor));
    updateFitCoachText(fitCoachText, savedMainColor, savedSecondaryColor); // Apply dynamic coloring

    mainColorSelect.addEventListener('change', () => {
        const mainColor = mainColorSelect.value;
        const textColor = getTextColor(mainColor);
        document.documentElement.style.setProperty('--main-color', mainColor);
        updateElementColors(mainColorSelect, mainColor);
        updateOptionColors(mainColorSelect, mainColor, textColor);
    });

    secondaryColorSelect.addEventListener('change', () => {
        const secondaryColor = secondaryColorSelect.value;
        const mainColor = mainColorSelect.value;
        updateElementColors(secondaryColorSelect, secondaryColor);
        updateOptionColors(secondaryColorSelect, secondaryColor, getTextColor(secondaryColor));
        updateElementColors(applyColorsButton, secondaryColor);
        updateSidebarColors(sidebarItems, secondaryColor, getTextColor(secondaryColor));
        updateSidebarToggleButton(sidebarToggleButton, secondaryColor, getTextColor(secondaryColor));
        updateFitCoachText(fitCoachText, mainColor, secondaryColor); // Update Fit Coach text dynamically
    });

    applyColorsButton.addEventListener('click', () => {
        const mainColor = mainColorSelect.value;
        const secondaryColor = secondaryColorSelect.value;

        document.documentElement.style.setProperty('--main-color', mainColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);

        localStorage.setItem('mainColor', mainColor);
        localStorage.setItem('secondaryColor', secondaryColor);

        updateFitCoachText(fitCoachText, mainColor, secondaryColor); // Ensure Fit Coach text updates

        alert('Colors updated successfully!');
    });
});












