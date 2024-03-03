const btnStart = document.querySelector('.start');
const btnStop = document.querySelector('.stop');
const btnLap = document.querySelector('.lap');
const btnReset = document.querySelector('.reset');

let hrs = min = sec = ms = 0;
let ctr = 0, startClock;
let laps = [];

btnStart.addEventListener('click', () => {
    btnStart.classList.add('start-active');
    btnStop.classList.remove('stop-active');
    startClock = setInterval(() => {
        ms++;
        if (ms == 100) {
            sec++;
            ms = 0;
        }
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hrs++;
            min = 0;
        }
        updateDisplay();
    }, 10);
});

btnStop.addEventListener('click', () => {
    clearInterval(startClock);
    btnStart.classList.remove('start-active');
    btnStop.classList.add('stop-active');
});

btnReset.addEventListener('click', () => {
    hrs = min = sec = ms = 0;
    clearInterval(startClock);
    laps = [];
    updateDisplay();
    btnStart.classList.remove('start-active');
    btnStop.classList.remove('stop-active');
});

btnLap.addEventListener('click', () => {
    laps.push({ hrs, min, sec, ms });
    displayLaps();
});

function updateDisplay() {
    const phrs = hrs < 10 ? '0' + hrs : hrs;
    const pmin = min < 10 ? '0' + min : min;
    const psec = sec < 10 ? '0' + sec : sec;
    const pms = ms < 10 ? '0' + ms : ms;
    document.querySelector('.hrs').innerText = phrs;
    document.querySelector('.min').innerText = pmin;
    document.querySelector('.sec').innerText = psec;
    document.querySelector('.ms').innerText = pms;
}

function displayLaps() {
    const lapList = document.querySelector('.lap-list');
    lapList.innerHTML = ''; // Clear lap list
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        const lapTime = `${lap.hrs}:${lap.min}:${lap.sec}.${lap.ms}`;
        lapItem.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapList.appendChild(lapItem);
    });
}



