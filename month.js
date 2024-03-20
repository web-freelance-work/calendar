let monthCalendarData = [];
let currentMonthIndex = 0;

function removeEventListeners() {
    const prevButton = document.querySelector('#calendar-header button:first-of-type');
    const nextButton = document.querySelector('#calendar-header button:last-of-type');
    prevButton.replaceWith(prevButton.cloneNode(true));
    nextButton.replaceWith(nextButton.cloneNode(true));
}


function initializeMonth() {
    removeEventListeners();
    try {
        monthCalendarData.push(monthData01, monthData02, monthData03, monthData04, monthData05, monthData06, monthData07, monthData08, monthData09, monthData10, monthData11, monthData12);

        renderMonth(currentMonthIndex);
    } catch (error) {
        console.error('Error loading calendar data:', error);
    }

    document.querySelector('#calendar-header button:first-of-type').addEventListener('click', moveToPreviousMonth);
    document.querySelector('#calendar-header button:last-of-type').addEventListener('click', moveToNextMonth);
}

function renderMonth(monthIndex) {
    const monthData = monthCalendarData[monthIndex];
    const monthName = monthData.month;
    const monthContent = monthData.data;

    const calendarContent = document.getElementById("calendar-content");
    calendarContent.innerHTML = '';

    const ul = document.createElement('ul');
    for (const date in monthContent) {
        const events = monthContent[date];
        const li = document.createElement('li');
        const eventList = document.createElement('ul');
        events.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.textContent = event.event;
            eventList.appendChild(eventItem);
        });
        li.appendChild(eventList);
        ul.appendChild(li);
    }
    calendarContent.appendChild(ul);

    document.getElementById('current').textContent = monthName;
}

function moveToPreviousMonth() {
    const previousButton = document.querySelector('#calendar-header button:first-of-type');
    if (previousButton.disabled) {
        return;
    }
    previousButton.disabled = true;

    if (currentMonthIndex > 0) {
        currentMonthIndex--;
        renderMonth(currentMonthIndex);
    }

    setTimeout(() => {
        previousButton.disabled = false;
    }, 100);
}

function moveToNextMonth() {
    const nextButton = document.querySelector('#calendar-header button:last-of-type');
    if (nextButton.disabled) {
        return;
    }
    nextButton.disabled = true;

    if (currentMonthIndex < monthCalendarData.length - 1) {
        currentMonthIndex++;
        renderMonth(currentMonthIndex);
    }

    setTimeout(() => {
        nextButton.disabled = false;
    }, 100);
}

document.addEventListener('DOMContentLoaded', (event) => {
    initializeMonth();
});
