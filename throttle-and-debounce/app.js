const inputThrottle = document.getElementById("inputThrottle");
const inputDebounce = document.getElementById("inputDebounce");
const throttleStatus = document.getElementById("throttleStatus");
const debounceStatus = document.getElementById("debounceStatus");
const displayTextThrottle = document.getElementById("displayTextThrottle");
const displayTextDebounce = document.getElementById("displayTextDebounce");

let throttleDelay = 3000;
let debounceDelay = 3000;

let throttleCounter, debounceCounter, debounceTimer;

const throttleFn = throttle(throttleDemo, throttleDelay);
inputThrottle.addEventListener("keyup", throttleFn);

const debounceFn = debounce(debounceDemo, debounceDelay);
inputDebounce.addEventListener("keyup", () => {
  clearInterval(debounceTimer);
  debounceDemoCounter();
  debounceFn();
});

function throttleDemo() {
  displayTextThrottle.innerText = inputThrottle.value;
  throttleCounter = throttleDelay;
  let timer = setInterval(() => {
    throttleCounter = Math.max(0, throttleCounter - 1000);
    throttleStatus.innerText = `Busy for ${throttleCounter / 1000} seconds`;
    
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    throttleStatus.innerText = "Available";
  }, throttleDelay);
}

function debounceDemo() {
  displayTextDebounce.innerText = inputDebounce.value;
  debounceStatus.innerText = "Wait";
  clearInterval(debounceTimer);
}

function debounceDemoCounter() {
  debounceCounter = debounceDelay;
  debounceTimer = setInterval(() => {
    debounceCounter = Math.max(0, debounceCounter - 1000);
    debounceStatus.innerText = `Display in ${debounceCounter / 1000} seconds`;
  }, 1000);
}
