//рандомайзер текстов по клику на кнопку
let texts = [];
let remainingTexts = []; // Массив для невыданных элементов

function getRandomElement(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

const button = document.querySelector('.randomiser__button');
const text = document.querySelector('.randomiser__text');

button.addEventListener('click', function () {
  if (remainingTexts.length === 0) {
    // Если невыданные элементы закончились, начинаем заново
    remainingTexts = [...texts]; // Копируем все элементы в массив невыданных
  }

  // Выбор случайного элемента из невыданных
  const randomIndex = Math.floor(Math.random() * remainingTexts.length);
  const randomElement = remainingTexts[randomIndex];

  // Удаляем выданный элемент из массива невыданных
  remainingTexts.splice(randomIndex, 1);

  text.textContent = randomElement; // Отображаем случайный элемент
});

// Загрузка текстов из файла
fetch('texts.txt')
  .then(response => response.text())
  .then(data => {
    texts = data.split(/(?:\r?\n){3}/);
    remainingTexts = [...texts]; // Инициализируем массив невыданных элементов

    // Устанавливаем случайный элемент в текст при загрузке страницы
    const initialRandomElement = getRandomElement(remainingTexts); // Изменено на remainingTexts
    text.textContent = initialRandomElement;

    // Удаляем начальный элемент из массива невыданных
    const initialIndex = remainingTexts.indexOf(initialRandomElement);
    if (initialIndex !== -1) {
      remainingTexts.splice(initialIndex, 1);
    }
  });

