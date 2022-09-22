const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getBodyColor() {
    body.style.backgroundColor = getRandomHexColor(); 
}

startBtn.addEventListener('click', () => {
    interval = setInterval(getBodyColor, 1000);
    startBtn.setAttribute('disabled', true);
}); 
stopBtn.addEventListener('click', () => {
    clearInterval(interval)
    startBtn.removeAttribute('disabled');
});