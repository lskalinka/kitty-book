let texts = [];
let remainingTexts = []; // Массив для невыданных элементов
let isClicked = false; // Флаг для отслеживания клика

const button = document.querySelector('.randomiser__button');
const icon = document.querySelector('.randomiser__icon'); // Получаем элемент иконки
const textElement = document.querySelector('.randomiser__text'); // Получаем элемент текста
const sign = document.querySelector('.randomiser__sign'); // Получаем элемент подписи

// Функция для получения случайного элемента
function getRandomElement(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

// Загрузка текста из файла
fetch('texts.txt')
  .then(response => response.text())
  .then(data => {
    texts = data.split(/(?:\r?\n){3}/);
    remainingTexts = [...texts]; // Инициализируем массив невыданных элементов
    // Устанавливаем случайный элемент в текст при загрузке страницы
    const initialRandomElement = getRandomElement(remainingTexts);
    textElement.textContent = initialRandomElement;
    // Удаляем начальный элемент из массива невыданных
    const initialIndex = remainingTexts.indexOf(initialRandomElement);
    if (initialIndex !== -1) {
      remainingTexts.splice(initialIndex, 1);
    }
  });

// Обработчик наведения мыши
button.addEventListener('mouseenter', function () {
  if (!isClicked) {
    sign.style.opacity = '0';
    button.classList.add('hide-after');
    icon.classList.add('hover'); // Увеличиваем иконку при наведении
  }
});

// Обработчик ухода курсора
button.addEventListener('mouseleave', function () {
  if (!isClicked) {
    icon.classList.remove('hover'); // Убираем увеличение при уходе курсора

    // Убираем надпись и псевдоэлемент с задержкой
    setTimeout(() => {
      sign.style.opacity = '1'; // Показываем подпись
      button.classList.remove('hide-after'); // Убираем класс для псевдоэлемента
    }, 100); // Задержка должна совпадать с длительностью уменьшения иконки
  }
});

// Обработчик клика
button.addEventListener('click', function () {
  isClicked = true; // Устанавливаем флаг клика
  icon.classList.add('rotate');
  icon.classList.add('hover'); // Удерживаем увеличение иконки при клике

  // Скрываем надпись и псевдоэлемент при клике
  sign.style.opacity = '0'; // Скрываем подпись
  button.classList.add('hide-after'); // Добавляем класс для скрытия псевдоэлемента

  // Ждем завершения анимации, прежде чем выполнять другие действия
  setTimeout(() => {
    icon.classList.remove('rotate');
    icon.classList.remove('hover'); // Убираем увеличение после завершения анимации
    isClicked = false; // Сбрасываем флаг клика после завершения анимации

    // Показываем надпись и псевдоэлемент после завершения анимации
    sign.style.opacity = '1'; // Показываем подпись
    button.classList.remove('hide-after'); // Убираем класс для псевдоэлемента

    // Если невыданные элементы закончились, начинаем заново
    if (remainingTexts.length === 0) {
      remainingTexts = [...texts]; // Копируем все элементы в массив невыданных
    }
    // Выбор случайного элемента из невыданных
    const randomIndex = Math.floor(Math.random() * remainingTexts.length);
    const randomElement = remainingTexts[randomIndex];
    // Удаляем выданный элемент из массива невыданных
    remainingTexts.splice(randomIndex, 1);
    textElement.textContent = randomElement; // Отображаем случайный элемент
  }, 1250); // Время должно совпадать с длительностью анимации
});
