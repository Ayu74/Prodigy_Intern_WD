
let startTime;
let interval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

function start() {
  if (!running) {
    startTime = Date.now() - (interval || 0);
    interval = setInterval(updateDisplay, 10);
    running = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
  }
}

function pause() {
  clearInterval(interval);
  interval = null;
  running = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function reset() {
  clearInterval(interval);
  interval = null;
  running = false;
  display.textContent = '00:00:00';
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapsList.innerHTML = '';
}

function updateDisplay() {
  const elapsed = Date.now() - startTime;
  const formattedTime = formatTime(elapsed);
  display.textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millis = milliseconds % 1000;

  return `${pad(minutes)}:${pad(seconds)}:${pad(millis, 3)}`;
}

function pad(num, size = 2) {
  let s = num.toString();
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
}