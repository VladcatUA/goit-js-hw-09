const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const colorBody = document.querySelector('body');
let timerId;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

btnStart.addEventListener('click', () => {
    const initialColor = getRandomHexColor();
    colorBody.style.backgroundColor = initialColor;

    timerId = setInterval(() => {
        const randomColor = getRandomHexColor();
        colorBody.style.backgroundColor = randomColor;
  }, 1000);
  btnStart.setAttribute("disabled", true);
});

btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
});