//рандомайзер текстов по клику на кнопку
let texts = [];


function getRandomElement(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

const button = document.querySelector('.randomiser__button');
const text = document.querySelector('.randomiser__text');

button.addEventListener('click', function () {
  const randomElement = getRandomElement(texts);
  text.textContent = randomElement;
});

fetch('texts.txt')
.then(response => response.text())
.then(data => {
  texts = data.split(/\n\n\n/);
});

//смена темы
document.addEventListener('DOMContentLoaded', function () {
  const themeImgFront = document.querySelector('.theme-img.front');
  const themeImgBack = document.querySelector('.theme-img.back');
  const ball = document.querySelector('.ball');

  function toggleRotation() {
    ball.classList.toggle('rotated');
  }

  themeImgFront.addEventListener('click', function(event) {
    event.stopPropagation();
    toggleRotation();
  });

  themeImgBack.addEventListener('click', function(event) {
    event.stopPropagation();
    toggleRotation();
  });

  ball.addEventListener('click', function(event) {
    event.stopPropagation();
    toggleRotation();
  });

  document.querySelector('.stage').addEventListener('click', function(event) {
    toggleRotation();
  });

  // Функция для обновления background в зависимости от класса rotated
  function updateBackground() {
    if (ball.classList.contains('rotated')) {
      ball.classList.add('rotated-state');
    } else {
      ball.classList.remove('rotated-state');
    }
  }

  // Вызываем функцию updateBackground при загрузке страницы, чтобы установить правильный фон
  updateBackground();
});











