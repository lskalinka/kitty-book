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

document.addEventListener('DOMContentLoaded', function() {
  const globeWorldmapFront = document.querySelector('.globe-worldmap-front');
  let currentPosition = 0;
  const step = 200; // Шаг перемещения в пикселях, 1/4 ширины изображения
  const totalWidth = 800; // Общая ширина изображения (4 шага по 200px)

  // Устанавливаем начальную позицию
  globeWorldmapFront.style.transform = `translateX(${currentPosition}px)`;

  document.querySelector('.globe').addEventListener('click', function() {
    // Увеличиваем текущее смещение на шаг
    currentPosition -= step;

    // Проверяем, не превысили ли мы ширину изображения
    if (currentPosition <= -totalWidth) {
      currentPosition = 0; // Если да, возвращаемся в начало
    }

    // Применяем новое положение
    globeWorldmapFront.style.transform = `translateX(${currentPosition}px)`;
  });
});

























