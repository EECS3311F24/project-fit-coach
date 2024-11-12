function openFn() {
    const over = document.getElementById("overlay");
    const popDialog = document.getElementById("popupDialog");
    over.classList.toggle("visible");
    popDialog.classList.toggle("visible");
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



