import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
let userSelectedDate;
button.disabled=true;
class Timer {
  constructor(onTick) {
    this.onTick = onTick;
    this.interval = null;
  }
  start() {
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const delta = userSelectedDate - currentTime;
      const time = this.convertMs(delta);
      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    date(userSelectedDate);
  },
};

flatpickr(input, options);

function date(userSelectedDate) {
  const currentDate = new Date();
  if (userSelectedDate < currentDate) {
    iziToast.show({
      title: '',
      message: 'Please choose a date in the future',
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      backgroundColor: 'red',
    });
  } else {
    button.disabled = false;
  }
}
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

function updateClockFace({ days, hours, minutes, seconds }) {
    daysData.textContent = timer.pad(days);
    hoursData.textContent = timer.pad(hours);
    minutesData.textContent = timer.pad(minutes);
    secondsData.textContent = timer.pad(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timer.interval);
        input.disabled = false;
        button.disabled = false;
    }
}
const timer = new Timer(updateClockFace);

button.addEventListener('click', () => {
  timer.start();
  input.disabled = true;
  button.disabled = true;
});