let is24HourFormat = true;
let alarmTime = null;
let isDarkMode = false;

function getCurrentTimeAndDate() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24HourFormat) {
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        document.getElementById('time').textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${amPm}`;
    } else {
        document.getElementById('time').textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Update date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    document.getElementById('date').textContent = `${day}, ${month} ${date}, ${year}`;

    // Check and trigger alarm
    checkAlarm();

    // Update time zones
    displayTimeInZone('America/New_York', 'ny-time');
    displayTimeInZone('Europe/London', 'london-time');
    displayTimeInZone('Asia/Tokyo', 'tokyo-time');
}

function checkAlarm() {
    const now = new Date();
    if (alarmTime && now.getHours() === alarmTime.getHours() && now.getMinutes() === alarmTime.getMinutes() && now.getSeconds() === alarmTime.getSeconds()) {
        alert("Alarm Ringing!");
        alarmTime = null; // Reset the alarm after it rings
    }
}

function displayTimeInZone(timeZone, elementId) {
    const now = new Date();
    const options = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById(elementId).textContent = now.toLocaleTimeString('en-US', options);
}

document.getElementById('toggle-format').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
});

document.getElementById('set-alarm').addEventListener('click', () => {
    const timeInput = document.getElementById('alarm-time').value;
    const now = new Date();
    alarmTime = new Date();
    alarmTime.setHours(timeInput.split(':')[0]);
    alarmTime.setMinutes(timeInput.split(':')[1]);
    alarmTime.setSeconds(0);
});

document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
});

document.getElementById('font-family').addEventListener('change', (event) => {
    document.getElementById('time').style.fontFamily = event.target.value;
    document.getElementById('date').style.fontFamily = event.target.value;
});

document.getElementById('font-color').addEventListener('input', (event) => {
    document.getElementById('time').style.color = event.target.value;
    document.getElementById('date').style.color = event.target.value;
});

document.getElementById('background-color').addEventListener('input', (event) => {
    document.body.style.backgroundColor = event.target.value;
});

setInterval(getCurrentTimeAndDate, 1000);
getCurrentTimeAndDate();
