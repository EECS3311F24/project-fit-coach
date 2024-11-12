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
