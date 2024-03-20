let dayCalendarData = [];
let currentDayIndex = 0;

function removeEventListeners() {
    const prevButton = document.querySelector('#calendar-header button:first-of-type');
    const nextButton = document.querySelector('#calendar-header button:last-of-type');
    prevButton.replaceWith(prevButton.cloneNode(true));
    nextButton.replaceWith(nextButton.cloneNode(true));
}

function initializeDay() {
    removeEventListeners();
    try {
        dayCalendarData.push(monthData01, monthData02, monthData03, monthData04, monthData05, monthData06, monthData07, monthData08, monthData09, monthData10, monthData11, monthData12);

        renderDay(currentDayIndex);
    } catch (error) {
        console.error('달력 데이터 로드 중 오류 발생:', error);
    }
    document.querySelector('#calendar-header button:first-of-type').onclick = moveToPreviousDay;
    document.querySelector('#calendar-header button:last-of-type').onclick = moveToNextDay;
}

function renderDay(dayIndex) {
    const monthIndex = Math.floor(dayIndex / 31);
    const day = dayIndex % 31 + 1;
    const monthData = dayCalendarData[monthIndex];
    const monthName = monthData.month;
    const events = monthData.data[day] || [];

    const calendarContent = document.getElementById("calendar-content");
    calendarContent.innerHTML = '';

    const ul = document.createElement('ul');
    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event.event;
        ul.appendChild(li);
    });
    calendarContent.appendChild(ul);

    document.getElementById('current').textContent = `${monthName} ${day}일`;
}

function moveToPreviousDay() {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        renderDay(currentDayIndex);
    }
}

function moveToNextDay() {
    if (currentDayIndex < 365 - 1) {
        currentDayIndex++;
        renderDay(currentDayIndex);
    }
}