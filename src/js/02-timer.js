import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs = {
btnStart: document.querySelector('[data-start]'),
dataDays: document.querySelector('[data-days]'),
dataHours: document.querySelector('[data-hours]'),
dataMinutes: document.querySelector('[data-minutes]'),
dataSeconds: document.querySelector('[data-seconds]'),
}
refs.btnStart.setAttribute('disabled', true);

let selectedDate = null;
let deltaTime = null;

class Timer {
  constructor({onTick}) {
    this.timerId = null;
    this.onTick = onTick;
  }
  start(userDate) {
    this.timerId = setInterval(() => {
      const { days, hours, minutes, seconds } = this.convertMs(userDate - Date.now());
    (Math.round(userDate - Date.now()))  >= 0  ? updateTimerInterface({ days, hours, minutes, seconds }) : clearInterval(this.timerId);

    }, 1000);
  }

    pad(value) {
      return String(value).padStart(2, '0');
    }

    convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24; 
      // Remaining days
      const days = this.pad(Math.floor(ms / day));
      // Remaining hours
      const hours = this.pad(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second)); 
      return { days, hours, minutes, seconds };
    }    
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}

refs.btnStart.addEventListener('click', () => { 
  timer.start(selectedDate);

});


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = this.selectedDates[0];    
    selectedDate > options.defaultDate ? refs.btnStart.removeAttribute('disabled') : (refs.btnStart.setAttribute('disabled', true), window.alert("Please choose a date in the future")); 
    deltaTime = selectedDates[0] - options.defaultDate; 
  },
};

flatpickr("#datetime-picker", options);

const timer = new Timer({
  onTick: updateTimerInterface,
});

