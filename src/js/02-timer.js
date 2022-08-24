import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datetimePickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysCounter: document.querySelector('span[data-days]'),
  hoursCounter: document.querySelector('span[data-hours]'),
  minutesCounter: document.querySelector('span[data-minutes]'),
  secondsCounter: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
let newDate = null;

flatpickr(refs.datetimePickerInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    newDate = selectedDates[0];
    if (newDate < Date.now()) {
      refs.startBtn.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
});

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.datetimePickerInput.disabled = true;

  timerId = setInterval(() => {
    let timeRemainder = convertMs(newDate - Date.now());

    if (newDate < Date.now()) {
      refs.datetimePickerInput.disabled = false;
      clearInterval(intervalId);
      return dateMarkup();
    }

    dateMarkup(timeRemainder);
    // refs.startBtn.disabled = true;
    // refs.datetimePickerInput.disabled = true;
  }, 1000);
}

function dateMarkup(object = { days: 0, hours: 0, minutes: 0, seconds: 0 }) {
  refs.daysCounter.textContent = object.days;
  refs.hoursCounter.textContent = object.hours;
  refs.minutesCounter.textContent = object.minutes;
  refs.secondsCounter.textContent = object.seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

refs.startBtn.addEventListener('click', onStartBtnClick);
