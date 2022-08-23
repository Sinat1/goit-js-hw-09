function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.stopBtn.disabled = true;

const onStartBtnClick = () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

refs.startBtn.addEventListener('click', onStartBtnClick);

const onStopBtnClick = () => {
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;

  clearInterval(timerId);
};

refs.stopBtn.addEventListener('click', onStopBtnClick);
