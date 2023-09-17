import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputTime = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const tDays = document.querySelector('span[data-days]');
const tHours = document.querySelector('span[data-hours]');
const tMinutes = document.querySelector('span[data-minutes]');
const tSeconds = document.querySelector('span[data-seconds]');

let countdownInterval; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate && selectedDate > new Date()) {
      btnStart.removeAttribute('disabled');
    } else {
      btnStart.setAttribute('disabled', true);
    }
  },
};

const calendar = flatpickr(inputTime, options);

btnStart.addEventListener('click', () => {
  const selectedDate = calendar.selectedDates[0];

  if (selectedDate && selectedDate > new Date()) {
    const timeDiff = selectedDate - new Date();
    startCountdown(timeDiff);
  } else {
    return Notify.failure('Please choose a date in the future');
  }
});

function startCountdown(ms) {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(ms);

    tDays.textContent = addLeadingZero(days);
    tHours.textContent = addLeadingZero(hours);
    tMinutes.textContent = addLeadingZero(minutes);
    tSeconds.textContent = addLeadingZero(seconds);

    if (ms <= 0) {
      clearInterval(countdownInterval);
      alert("Countdown has finished!");
    } else {
      ms -= 1000; 
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value.toString();
}
