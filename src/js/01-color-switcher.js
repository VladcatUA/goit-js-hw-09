const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const colorBody = document.querySelector('body');
let timerId;

btnStop.setAttribute("disabled", true);
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

btnStart.addEventListener('click', (element) => {
    const initialColor = getRandomHexColor();
    colorBody.style.backgroundColor = initialColor;

    timerId = setInterval(() => {
        const randomColor = getRandomHexColor();
        colorBody.style.backgroundColor = randomColor;
  }, 1000);
  element.target.setAttribute("disabled", true);
  btnStop.removeAttribute("disabled");
});

btnStop.addEventListener('click', (element) => {
    clearInterval(timerId);
    element.target.setAttribute("disabled", true);
    btnStart.removeAttribute("disabled");
});
