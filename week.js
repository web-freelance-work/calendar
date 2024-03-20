let weekCalendarData = [];
let currentWeekIndex = 0;
const monthLastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function removeEventListeners() {
    const prevButton = document.querySelector('#calendar-header button:first-of-type');
    const nextButton = document.querySelector('#calendar-header button:last-of-type');
    prevButton.replaceWith(prevButton.cloneNode(true));
    nextButton.replaceWith(nextButton.cloneNode(true));
}

function initializeWeek() {
    removeEventListeners();
    try {
        weekCalendarData.push(monthData01, monthData02, monthData03, monthData04, monthData05, monthData06, monthData07, monthData08, monthData09, monthData10, monthData11, monthData12);
        renderWeek(currentWeekIndex);
    } catch (error) {
        console.error('달력 데이터 로드 중 오류 발생:', error);
    }
    document.querySelector('#calendar-header button:first-of-type').onclick = moveToPreviousWeek;
    document.querySelector('#calendar-header button:last-of-type').onclick = moveToNextWeek;
}

function renderWeek(weekIndex) {
    let daysPassed = 0;
    let monthIndex = 0;
    while (weekIndex >= 0 && monthIndex < monthLastDays.length) {
        const daysInThisMonth = monthLastDays[monthIndex];
        const weeksInThisMonth = Math.ceil(daysInThisMonth / 7);
        if (weekIndex < weeksInThisMonth) {
            break;
        }
        weekIndex -= weeksInThisMonth;
        daysPassed += daysInThisMonth;
        monthIndex++;
    }
    
    let weekStart = daysPassed + weekIndex * 7 + 1;
    let weekEnd = weekStart + 6;
    if (weekStart + 6 > daysPassed + monthLastDays[monthIndex]) {
        weekEnd = daysPassed + monthLastDays[monthIndex];
    }
    weekStart -= daysPassed;
    weekEnd -= daysPassed;

    const monthData = weekCalendarData[monthIndex];
    const monthName = monthData.month;

    const calendarContent = document.getElementById("calendar-content");
    calendarContent.innerHTML = '';

    const ul = document.createElement('ul');
    for (let i = weekStart; i <= weekEnd; i++) {
        const day = i > monthLastDays[monthIndex] ? i - monthLastDays[monthIndex] : i;
        const events = monthData.data[day] || [];
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

    document.getElementById('current').textContent = `${monthName} ${weekStart}일 - ${monthName} ${weekEnd}일`;
}

function moveToPreviousWeek() {
    if (currentWeekIndex > 0) {
        currentWeekIndex--;
        renderWeek(currentWeekIndex);
    }
}

function moveToNextWeek() {
    const maxWeeks = monthLastDays.reduce((acc, days) => acc + Math.ceil(days / 7), 0);
    if (currentWeekIndex < maxWeeks - 1) {
        currentWeekIndex++;
        renderWeek(currentWeekIndex);
    }
}