const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");
const breakDecrement = document.getElementById("break-decrement");
const breakIncrement = document.getElementById("break-increment");
const sessionDecrement = document.getElementById("session-decrement");
const sessionIncrement = document.getElementById("session-increment");
const timerLabel = document.getElementById("timer-label");
const timeLeft = document.getElementById("time-left");
const startStop = document.getElementById("start_stop");
const resetBth = document.getElementById("reset");
const breakLabel = document.getElementById("break-label");
const sessionLabel = document.getElementById("session-label");
const beep = document.getElementById("beep");

let isRunning = false;

const reset = () => {
  isRunning = false;
  beep.pause();
  timerLabel.textContent = "Session";
  breakLength.textContent = "5";
  sessionLength.textContent = "25";
  timeLeft.textContent = "25:00";
};

const increment = (target) => {
  const currentValue = Number(target.textContent);
  if (currentValue < 60) {
    const newValue = currentValue + 1;
    target.textContent = newValue;
    if (target === sessionLength) {
      updateClock(newValue);
    }
  }
};

const decrement = (target) => {
  const currentValue = Number(target.textContent);
  if (currentValue > 1) {
    const newValue = currentValue - 1;
    target.textContent = newValue;
    if (target === sessionLength) {
      updateClock(newValue);
    }
  }
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}

const updateClock = (minutes) => {
  let newTime;
  if (minutes === 60) {
    newTime = "60:00";
  } else {
    const seconds = minutes * 60;
    newTime = formatTime(seconds);
  }

  timeLeft.textContent = newTime;
};

const decrementSecond = () => {
  const currentTime = timeLeft.textContent;
  let [minutes, seconds] = currentTime.split(":").map(Number);
  let totalSeconds = minutes * 60 + seconds - 1;
  if (totalSeconds < 0) {
    totalSeconds = 0; // Ensure the timer doesn't go negative
  }
  const newTime = formatTime(totalSeconds);
  console.log(newTime);
  timeLeft.textContent = newTime;
};

const startStopClock = () => {
  isRunning = !isRunning;
  let timer = setInterval(() => {
    if (isRunning && timeLeft.textContent !== "00:00") {
      decrementSecond();
    } else if(isRunning && timeLeft.textContent === "00:00") {
      beep.play();
      timerLabel.textContent = timerLabel.textContent === "Session" ? "Break" : "Session";
      timerLabel.textContent === "Session" ? updateClock(sessionLength.textContent) : updateClock(breakLength.textContent);
    } else {
      clearInterval(timer);
      isRunning = false;
    }
  }, 1000);
};

breakDecrement.addEventListener("click", () => decrement(breakLength));
breakIncrement.addEventListener("click", () => increment(breakLength));
sessionDecrement.addEventListener("click", () => decrement(sessionLength));
sessionIncrement.addEventListener("click", () => increment(sessionLength));
resetBth.addEventListener("click", reset);
startStop.addEventListener("click", startStopClock);
