import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const input = document.querySelector('#datetime-picker');
flatpickr(input, options);

